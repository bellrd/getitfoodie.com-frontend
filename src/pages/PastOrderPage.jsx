import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Container,
    CssBaseline,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import Axios from "axios";
import {ExpandMore, KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import {BASE_URL} from "../constant";
import {Redirect, useHistory} from "react-router-dom"
import Footer from "../components/Footer";
import {GlobalContext} from "../GlobalContext";
import {Rating} from "@material-ui/lab";


const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(.5),
        paddingRight: theme.spacing(.5)
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing(3),
    },
    heading: {
        display: "flex",
        flex: 1,
        justifyContent: "space-between",
    },
    orderid: {
        paddingRight: theme.spacing(2)
    },
    helpText: {
        marginTop: theme.spacing(8)
    },
}));

const Orating = (props) => {
    const ctx = useContext(GlobalContext);
    const [rate, setRate] = useState(props.order.rating || 0);
    const rateOrder = (order, value) => {
        Axios.put(`${BASE_URL}/order-history/${order.id}/`,{...order,rating:value} , {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                alert("Thanks for your feedback");
                setRate(value)
            }
        ).catch(error => {
            alert("Rating not allowed.")
        })
    };
    return <Rating value={rate} precision={1} onChange={(e, newValue) => {
        rateOrder(props.order, newValue);
        props.order.rating = newValue;
    }}>
    </Rating>
};


export default (props) => {
    const ctx = useContext(GlobalContext);
    const [orders, setOrders] = useState();
    const history = useHistory();

    useEffect(() => {
        Axios.get(`${BASE_URL}/order-history/`, {headers: {Authorization: ctx.state.accessToken}}).then(
            response => {
                setOrders(response.data.reverse())
            }
        ).catch((error) => {
                alert("Failed to load orders.")
            }
        )
    }, []);


    const classes = useStyles();

    if (!ctx.state.accessToken || ctx.state.accessToken == "Token null" || ctx.state.accessToken == "Token undefined") {
        return <Redirect to={{pathname: "/login", next: "/pastOrder"}}/>
    }

    if (!orders || orders.length === 0) {
        return (
            <div>
                <Container maxWidth={"sm"}>
                    <CssBaseline>
                        <Grid container spacing={0} direction={"column"} alignItems={"center"} justify={"center"}
                              style={{minHeight: '100vh'}}>
                            <Grid item xs={12}>
                                <Typography align={"center"} variant={"h4"}> No, Order Found </Typography>
                            </Grid>
                        </Grid>
                    </CssBaseline>
                </Container>
            </div>
        )
    } else
        return (
            <React.Fragment>
                <Container maxWidth={"sm"} className={classes.main}>
                    <CssBaseline/>

                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"} align={"center"}> <b> Orders </b></Typography>
                    </div>
                    {orders.map((order, index) => (
                        <Box m={4}>
                            <ExpansionPanel key={order.id} elevation={3}>

                                <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                            <Typography> <b> #{order.id} </b></Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography
                                                variant={"body2"}> On {order.date} from {order.merchandise}</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography color={"primary"}
                                                        variant={"subtitle1"}> {order.last_status}</Typography>
                                        </Grid>
                                    </Grid>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <TableContainer component={Paper} elevation={0} variant={"outlined"}>
                                        <Table>
                                            <caption> Total {order.total} </caption>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align={"center"}> <b> Name </b> </TableCell>
                                                    <TableCell align={"right"}><b> Size </b> </TableCell>
                                                    <TableCell align={"right"}> <b> Quantity </b></TableCell>
                                                    <TableCell align={"left"}> <b>SubTotal </b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {order.order_items.map((order_item, index) => (
                                                    <TableRow key={order.id + index}>
                                                        <TableCell align={"center"}> {order_item.name}</TableCell>
                                                        <TableCell align={"right"}> {order_item.size}</TableCell>
                                                        <TableCell align={"center"}> {order_item.quantity}</TableCell>
                                                        <TableCell
                                                            align={"left"}> {order_item.price * order_item.quantity}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>


                                </ExpansionPanelDetails>
                                <Box m={2}>
                                    <Orating order={order}/>
                                </Box>
                            </ExpansionPanel>
                        </Box>
                    ))}

                </Container>
                <Footer/>
            </React.Fragment>
        )
}
