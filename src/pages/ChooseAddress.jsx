import React, {useContext, useEffect, useState} from "react";
import {Link, Redirect, useHistory} from "react-router-dom"
import {
    Button,
    Container,
    CssBaseline,
    Divider,
    Fab,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    MenuItem,
    Paper,
    Radio,
    Select,
    Typography
} from "@material-ui/core";
import {Add,Payment, KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import {GlobalContext} from "../GlobalContext";
import Axios from "axios";
import {BASE_URL} from "../constant";


const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        justifyContent: "space-between",
    },
    root: {
        marginTop: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(3)
    },
    addNew: {
        marginTop: theme.spacing(2),
        marginLeft: theme.spacing(0)
    },
    addNewFab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    },
    coupon: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(3),
    }

}));


export default (props) => {

    const ctx = useContext(GlobalContext);
    const [addresses, setAddresses] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const [coupon, setCoupon] = useState("Select coupon")
    const history = useHistory();
    const classes = useStyles();
    useEffect(() => {
        Axios.get(`${BASE_URL}/address/`, {headers: {Authorization: ctx.state.accessToken}}).then(response => {
            console.log(response);
            setAddresses(response.data)
        }).catch(error => {
            alert("Can't load address.")
        })
    }, []);

    useEffect(() => {
        Axios.get(`${BASE_URL}/get-valid-coupon/`).then(response => {
                setCoupons(response.data)
            }
        ).catch(error => {
            console.log("Coupon loading failed.")
        })
    }, []);
    if (!ctx.state.accessToken || ctx.state.accessToken == "Token null") {
        return <Redirect to={{pathname: "/login", next: "/chooseAddress"}}/>
    } else
        return (
            <React.Fragment>
                <Container maxWidth={"sm"} className={classes.root}>
                    <CssBaseline/>
                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"} align={"center"}><b> Choose Address </b> </Typography>
                    </div>
                    <Paper className={classes.paper} elevation={3}>
                        <List subheader={<ListSubheader disableSticky> Addresses </ListSubheader>}>
                            {
                                addresses.map((address, index) => (
                                    <React.Fragment>
                                        <ListItem key={index}>
                                            <ListItemText primary={address.landmark || "No landmark"} secondary={
                                                <React.Fragment>

                                                    <Typography variant={"subtitle1"}> {address.detail}</Typography>
                                                    <Button variant={"text"} component={Link} size={"small"}
                                                            color={"secondary"}
                                                            to={{
                                                                pathname: "/editAddress",
                                                                address: address,
                                                                hidden: props.location.hidden
                                                            }}> Edit </Button>
                                                </React.Fragment>

                                            }>
                                            </ListItemText>

                                            <ListItemSecondaryAction>
                                                <Radio edge={"end"} checked={ctx.state.address_id === address.id} onChange={() => {
                                                    ctx.dispatch(
                                                        {
                                                            type: "ADDRESS_SELECTED",
                                                            payload: address
                                                        });
                                                }
                                                }/>

                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider/>
                                    </React.Fragment>
                                ))
                            }

                            <Button color={"primary"} className={classes.addNew} onClick={() => {
                                history.push("/editAddress")
                            }}> Add new </Button>
                        </List>
                    </Paper>

                    {coupons.length !== 0 ? (<Paper className={classes.coupon} elevation={3}>

                            <Typography variant={"subtitle2"} align={"left"}> Select coupon. </Typography>

                            <Select style={{width:"50%"}} variant={"outlined"} fullWidth value={coupon} name="payment" onChange={(e) => {
                                ctx.state.coupon = e.target.value
                                setCoupon(e.target.value)
                            }}>
                                {
                                    coupons.map((c, index) => (
                                        <MenuItem key={index} value={c.code}>
                                            <b> {c.code} &nbsp; </b> <br/>
                                            <small> {c.description} </small>
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </Paper>
                    ) : (<small> </small>)}
                </Container>
                <Fab variant={"extended"} color={"primary"} onClick=
                         {(e) => {
                             e.stopPropagation()
                             if(!ctx.state.address_id){
                                 alert("Select address")
                                 return
                             }

                             if (props.location.next === "/") {
                                 history.replace("/")
                             } else {
                                 history.replace("/checkout")
                             }
                         }
                         }


                     color={"primary"} size={"large"} className={classes.addNewFab}>
                    <Payment/> Payment
                </Fab>
            </React.Fragment>
        )
}