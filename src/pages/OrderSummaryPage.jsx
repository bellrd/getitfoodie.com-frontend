import {
  Container,
  CssBaseline,
  Divider,
  Fab,
  Grid,
  makeStyles,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Loader from "../components/Loader";
import { BASE_URL } from "../constant";
import { GlobalContext } from "../GlobalContext";
import DeliveryPattern from "../components/DeliveryPattern";
import CancelOrder from "../components/CancelOrder";
const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(2),
  },
  detail: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "space-evenly",
  },
  payment: {
    marginBottom: theme.spacing(1.5),
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    left: theme.spacing(4),
  },
  orderitems: {
    marginTop: theme.spacing(4),
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  first: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  second: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    // fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "12px",
    color: "#333",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(0),
  },
}));

export default (props) => {
  const [payment, setPayment] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
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
      rider_tip: ctx.state.rider_tip,
    };
    console.log({ data });
    Axios.post(`${BASE_URL}/make-order/`, data, {
      headers: { Authorization: ctx.state.accessToken },
    })
      .then((response) => {
        console.log(response.data);
        setOrder(response.data);
      })
      .catch((error) => {
        setDisableSubmit(false);
        alert(error.response.data);
        history.replace(`/menu/${ctx.state.merchandise_id}`);
      });
  }, []);

  const handleSubmit = () => {
    setDisableSubmit(true);
    if (payment_method === "" || order === null) {
      alert("select payment method");
      setDisableSubmit(false);
      return;
    }

    if (payment_method === "COD") {
      Axios.post(
        `${BASE_URL}/place-order-cod/`,
        {
          id: order.id,
          payment_method: "COD",
        },
        { headers: { Authorization: ctx.state.accessToken } }
      )
        .then((response) => {
          ctx.dispatch({ type: "ORDER_PLACED" });
          setTimeout(() => {
            history.replace("/success/simsim");
          }, 2000);
        })
        .catch((error) => {
          alert(error.response.data);
          history.replace("/cart");
        });
    } else if (payment_method === "ONLINE") {
      Axios.post(
        `${BASE_URL}/place-order-online/`,
        {
          id: order.id,
          payment_method: "ONLINE",
        },
        { headers: { Authorization: ctx.state.accessToken } }
      )
        .then((response) => {
          console.log(response.data);
          history.push({
            pathname: "/pay-online",
            payload: response.data,
          });
        })
        .catch((error) => {
          console.log({ error });
          alert("Failed Try again");
          history.replace("/cart");
        });
    } else {
    }
  };

  if (!ctx.state.accessToken || ctx.state.accessToken == "Token null") {
    return <Redirect to={{ pathname: "/login", next: "/cart" }} />;
  }

  if (!order) {
    return (
      <div>
        <Container maxWidth={"sm"}>
          <CssBaseline>
            <Grid
              container
              spacing={0}
              direction={"column"}
              alignItems={"center"}
              justify={"center"}
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <Loader type={"Watch"} height={80} />
              </Grid>
            </Grid>
          </CssBaseline>
        </Container>
      </div>
    );
  } else {
    return (
      <Container maxWidth={"sm"} className={classes.root}>
        <Paper className={classes.payment} elevation={3}>
          <Typography variant={"subtitle1"}>
            <b> Choose Payment option </b>
          </Typography>
          <Select
            fullWidth
            variant={"filled"}
            value={payment_method}
            name="payment"
            onChange={(e) => {
              setPayment_method(e.target.value);
            }}
          >
            {order.total >= 66666           ///here was 6666 to disable online payment option appearence
              ? ["ONLINE"].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))
              : ["COD"].map((option, index) => (
              //  : ["COD","ONLINE"].map((option, index) => (                   ///this handles payment option for cod or online
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
          </Select>
        </Paper>
        <text
        style={{
          textAlign:"center"

        }}
        >You can also pay via any UPI app to our delivery executive.</text>
        <h2
        style={{
          textAlign:"center",
          textDecoration:"underline"
        }}
        >Billing Page</h2>

        <Paper className={classes.first} elevation={3}>
          <div className={classes.second}>
            <span> Item Total </span>
            <span style={{color:"green"}}>Rs. {order.real_vendor_total} <del style={{color:"red", fontSize:"15px"}}>{order.vendor_total}</del></span>
          </div>

          <Divider variant="fullWidth" />

          <div className={classes.second}>
            <span> Delivery Charge </span>
            <span style={{color:"green"}}> {order.delivery_charge === 0 ? "Free Delivery" : order.delivery_charge }  <del style={{color:"red"}}> 32</del></span>
                {/* if (order.delivery_charge === 0)
                .then ("Free Delivery")  */}
          </div>
          <Divider variant="fullWidth" />



          <Divider variant="fullWidth" />

          <div className={classes.second}>
            <span> Packaging </span>
            <span> <b style={{color:"green"}} >FREE </b> <del style={{color:"red"}}>15</del>  </span>
                {/* if (order.delivery_charge === 0)
                .then ("Free Delivery")  */}
          </div>
          <Divider variant="fullWidth" />




          <div className={classes.second}>
            <span>Gst (tax)</span>
            {/* <span> {order.tax}</span> */}
            <span style={{color:"green"}}> {order.tax === 0 ? "Tax Free" : order.tax }  <del style={{color:"red"}}>  26</del></span>
          </div>

          <Divider variant="fullWidth" />
          <div style={{
            color:"green",
            fontWeight:"bold",
            fontSize:"13px"

          }} 
          className={classes.second}>
            <span
            style={{
              color:"green",
              fontWeight:"bold",
              fontSize:"13px"
            }} 
            
            > Special Discount </span>
            <span> -{order.discount}</span>
          </div>
          <Divider variant="fullWidth" />
          <div 
          style={{
            color:"green",
            fontWeight:"bold",
            fontSize:"13px"

          }} 
          className={classes.second}>
            <span> Wallet Discount </span>
            <span> -{order.from_wallet}</span>
          </div>









          <Divider variant="fullWidth" />
          <div className={classes.second}>
            <span
              style={{
                fontSize: "15px",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              TOTAL TO PAY
            </span>
            {/* <span
              style={{
                fontSize: "3vh",
                fontWeight: "bold",
                color: "blue"
              }}
            >
              ₹ {order.total}
              <del
              style={{
                color: "red",
                fontSize:"3vh"
              }}
              > {order.total + order.discount}</del>  
            </span> */}

              {/* <span
              style={{
                fontSize: "3vh",
                fontWeight: "bold",
                color: "blue"
              }}
            >
              ₹ {order.total}
              <del
              style={{
                color: "red",
                fontSize:"3vh"
              }}
              > {order.total + order.discount}</del>  
            </span> */}

              <span> {order.tax === 0 ? <span
              style={{
                fontSize: "3vh",
                fontWeight: "bold",
                color: "blue"
              }}
            >
              ₹ {order.total}
              {/* <del
              style={{
                color: "red",
                fontSize:"3vh"
              }}
              > {order.total + order.discount}</del>   */}
            </span> : <span
              style={{
                fontSize: "3vh",
                fontWeight: "bold",
                color: "blue"
              }}
            >
              ₹ {order.total}
              <del
              style={{
                color: "red",
                fontSize:"3vh"
              }}
              > {order.vendor_total + 32 +15 +26}</del>  
            </span> }</span>
              
              

          </div>
        </Paper>

        <Fab
          variant={"extended"}
          size={"large"}
          className={classes.fab}
          color={"primary"}
          onClick={handleSubmit}
          disabled={disableSubmit}
        >
          {disableSubmit ? "Wait" : "Place Order"}
        </Fab>
        {/* <h2
        style={{
          textAlign:"center",
          color:"green",
          fontWeight:"bold"
        }}
        >You Saved {""+""} {order.discount} Rs. on This Deal.</h2> */}
        {/* order.from_wallet */}
        <span> {order.tax === 0 ? <h2
        style={{
          textAlign:"center",
          color:"green",
          fontWeight:"bold"
        }}
        >This Vendor is Already at Discount Price.</h2> : <h2
        style={{
          textAlign:"center",
          color:"green",
          fontWeight:"bold"
        }}
        >You Saved {""+""} {order.vendor_total + 32 +15 +26 - order.total } Rs. on This Deal.</h2> }</span>
        <span> <h3 style={{textAlign:"center", color:"green", fontWeight:"bold"}} >Try to Order Above 149 Rs. to Save Your Money.</h3></span>
<DeliveryPattern/>
<CancelOrder/>
      </Container>

    );
  }
};
