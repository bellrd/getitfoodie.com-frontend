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
    marginBottom: theme.spacing(2),
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
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
    fontFamily: "Nunito",
    textTransform: "capitalize",
    fontSize: "14px",
    color: "#333",
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(2),
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
            {order.total >= 800
              ? ["ONLINE"].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))
              : ["COD", "ONLINE"].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
          </Select>
        </Paper>

        <Paper className={classes.first} elevation={3}>
          <div className={classes.second}>
            <span> Item total </span>
            <span> {order.vendor_total}</span>
          </div>

          <Divider variant="fullWidth" />

          <div className={classes.second}>
            <span> Delivery Charge </span>
            <span> {order.delivery_charge}</span>
          </div>
          <Divider variant="fullWidth" />
          <div className={classes.second}>
            <span>Gst (tax)</span>
            <span> {order.tax}</span>
          </div>

          <Divider variant="fullWidth" />
          <div className={classes.second}>
            <span> Coupon Discount </span>
            <span> -{order.discount}</span>
          </div>
          <Divider variant="fullWidth" />
          <div className={classes.second}>
            <span> Wallet discount </span>
            <span> -{order.from_wallet}</span>
          </div>
          <Divider variant="fullWidth" />
          <div className={classes.second}>
            <span
              style={{
                fontSize: "3vh",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              TOTAL
            </span>
            <span
              style={{
                fontSize: "5vh",
                fontWeight: "bold",
                color: "blue",
              }}
            >
              ₹ {order.total}
            </span>
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
      </Container>
    );
  }
};
