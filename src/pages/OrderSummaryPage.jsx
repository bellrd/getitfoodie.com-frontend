import React, {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../GlobalContext";
import {
    Container,
    CssBaseline,
    Fab,
    Grid,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@material-ui/core";
import {Redirect, useHistory} from "react-router-dom"
import {BASE_URL} from "../constant";
import Axios from "axios";
import Loader from "../components/Loader"


const useStyles = makeStyles(theme => ({
    spinner: {
        margin: 0,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
    },
    container: {
        position: "relative",
    },
    root: {
        marginTop: theme.spacing(4),
    },
    detail: {
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "space-evenly"
    },
    payment: {
        marginBottom: theme.spacing(4),
        padding: theme.spacing(3),
        marginTop: theme.spacing(2),
    },
    fab: {
        position: "fixed",
        bottom: theme.spacing(4),
        right: theme.spacing(4)
    },
    orderitems: {
        marginTop: theme.spacing(4),
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
}));

export default (props) => {


    const [payment, setPayment] = useState("");
    const [disableSubmit, setDisableSubmit] = useState(false)
    const history = useHistory();
    const ctx = useContext(GlobalContext);
    const [order, setOrder] = useState(null);
    const [payment_method, setPayment_method] = useState("");
    const classes = useStyles();

    useEffect(() => {
        const data = {
            cart: ctx.state.cart,
            merchandise_id: ctx.state.merchandise_id,
            address_id: ctx.state.address_id,
            coupon: ctx.state.coupon,
            additional_detail: ctx.state.additional_detail,
            rider_tip: ctx.state.rider_tip
        };
        console.log({data});
        Axios.post(`${BASE_URL}/make-order/`, data, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                console.log(response.data);
                setOrder(response.data)
            }
        ).catch(error => {
            setDisableSubmit(false)
            alert(error.response.data)
            history.replace(`/menu/${ctx.state.merchandise_id}`)
        })
    }, []);

    const handleSubmit = () => {
        setDisableSubmit(true)
        if (payment_method === "" || order === null) {
            alert("select payment method");
            setDisableSubmit(false)
            return
        }

        if (payment_method === 'COD') {
            Axios.post(`${BASE_URL}/place-order-cod/`, {
                id: order.id,
                payment_method: 'COD'
            }, {headers: {Authorization: ctx.state.accessToken}}).then(
                response => {
                    ctx.dispatch({type: "ORDER_PLACED"});
                    setTimeout(() => {
                        history.replace("/success/simsim")
                    }, 2000)
                }
            ).catch(error => {
                    alert(error.response.data);
                    history.replace("/cart")
                }
            )
        } else if (payment_method === 'ONLINE') {
            Axios.post(`${BASE_URL}/place-order-online/`, {
                id: order.id,
                payment_method: "ONLINE"
            }, {headers: {Authorization: ctx.state.accessToken}}).then(
                response => {
                    console.log(response.data);
                    history.push({
                        pathname: "/pay-online",
                        payload: response.data
                    })
                }
            ).catch(error => {
                console.log({error});
                alert("Failed Try again");
                history.replace("/cart")
            })
        } else {
        }
    };

    if (!ctx.state.accessToken || ctx.state.accessToken == "Token null") {
        return <Redirect to={{pathname: "/login", next: "/cart"}}/>
    }

    if (!order) {
        return (
            <div>
                <Container maxWidth={"sm"}>
                    <CssBaseline>
                        <Grid container spacing={0} direction={"column"} alignItems={"center"} justify={"center"}
                              style={{minHeight: '100vh'}}>
                            <Grid item xs={3}>
                                <Loader type={"Watch"} height={80}/>
                            </Grid>
                        </Grid>
                    </CssBaseline>
                </Container>
            </div>
        )
    } else {
        return (
            <Container maxWidth={"sm"} className={classes.root}>
                <Paper className={classes.payment}>
                    <Typography variant={"subtitle1"}> <b> Choose Payment option </b></Typography>
                    <Select fullWidth variant={"filled"} value={payment_method} name="payment" onChange={(e) => {
                        setPayment_method(e.target.value)
                    }}>
                        {
                            ['COD', 'ONLINE'].map((option, index) => (
                                <MenuItem key={index} value={option}> {option}</MenuItem>
                            ))
                        }
                    </Select>
                </Paper>


                <TableContainer component={Paper} elevation={0} variant={"outlined"}
                                className={classes.orderitems}>
                    <Table>
                        <caption> From {order.merchandise_name}</caption>
                        <TableHead>
                            <TableRow>
                                <TableCell align={"left"}> <b> To Pay</b></TableCell>
                                <TableCell align={"left"}> <b> Sub Total</b></TableCell>
                                <TableCell align={"center"}> <b> <small>Tax & Delivery, Tip </small></b> </TableCell>
                                <TableCell align={"left"}> <b> <small> Discount & wallet </small> </b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell align={"center"}> <b>{order.total} </b></TableCell>
                                <TableCell align={"center"}> {order.vendor_total} </TableCell>
                                <TableCell
                                    align={"center"}> {+order.tax + +order.delivery_charge + +order.rider_tip}</TableCell>
                                <TableCell align={"center"}> {+order.from_wallet + +order.discount} </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

                <Fab variant={"extended"} size={"large"} className={classes.fab} color={"primary"}
                     onClick={handleSubmit} disabled={disableSubmit}>
		{disableSubmit ? "Wait" : "Place Order"}
                </Fab>
            </Container>
        )
    }
}

