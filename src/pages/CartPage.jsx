import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  CardContent,
  Divider,
  Fab,
  Grid,
  MenuItem,
  Select,
  IconButton,
  List,
  ListSubheader,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core/";
import {
  Add,
  ArrowRightAltRounded as Proceed,
  Delete,
  KeyboardBackspaceRounded as Back,
  Remove,
} from "@material-ui/icons";
import Axios from "axios";
import { BASE_URL } from "../constant";
import { Container, CssBaseline, Hidden, makeStyles } from "@material-ui/core";
import { GlobalContext } from "../GlobalContext";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
    justifyContent: "space-between",
    padding: theme.spacing(1),
    display: "flex",
    flexDirection: "row",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    fontWeight: "bolder",
  },

  controls: {
    padding: theme.spacing(0, 0, 1, 2),
  },
  main: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(3),
  },
  checkoutDesktop: {
    position: "fixed",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    bottom: 25,
    zIndex:999,
  },
  checkoutMobile: {
    position: "fixed",
    right: 20,
    bottom: 15,
    zIndex:999,
  },
  additional_detail: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(4),
  },

  coupon: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
  },
}));

const CartItem = (props) => {
  const ctx = useContext(GlobalContext);
  const cart_item = props.cart_item;
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant={"subtitle2"} style={{ fontWeight: "bold" }}>
            <small
            style={{
              fontSize:"2vh",
            }}
            >{cart_item.name}</small>
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            <small>{cart_item.size} x {cart_item.quantity} = {cart_item.price * cart_item.quantity}</small>
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <ButtonGroup size={"small"} color={"secondary"} variant={"outlined"}>
            <IconButton
              onClick={() => {
                ctx.dispatch({
                  type: "REMOVE_ONE_ITEM",
                  payload: { ...cart_item },
                });
              }}
            >
              <Remove />
            </IconButton>

            <Button
              variant={"contained"}
              color={"primary"}
              disableElevation={true}
            >
              {" "}
              {cart_item.quantity}{" "}
            </Button>

            <IconButton
              onClick={() => {
                ctx.dispatch({
                  type: "ADD_ONE_ITEM",
                  payload: { ...cart_item },
                });
              }}
            >
              <Add />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
      <div className={classes.info}>
        <IconButton
          size={"small"}
          onClick={() => {
            ctx.dispatch({ type: "DELETE_ITEM", payload: { ...cart_item } });
          }}
        >
          <Delete color={"secondary"} />
        </IconButton>
        <Typography>{cart_item.price * cart_item.quantity}</Typography>
      </div>
    </Box>
  );
};

export default (props) => {
  useEffect(() => {
    Axios.get(`${BASE_URL}/get-valid-coupon/`)
      .then((response) => {
        console.log("doomsday 001");
        console.log(ctx.state.merchandise_id);
        ctx.state.merchandise_id === "4" ? setCoupons([]) : setCoupons(response.data);
      })
      .catch((error) => {
        console.log("Coupon loading failed.");
      });
  }, []);
  const ctx = useContext(GlobalContext);
  const history = useHistory();
  const classes = useStyles();
  const [coupons, setCoupons] = useState([]);
  const [coupon, setCoupon] = useState("Select coupon");

  if (
    ctx.state.cart.length === 0 ||
    (ctx.state.cart.length && ctx.state.merchandise_id == null)
  ) {
    localStorage.removeItem("merchandise_id");
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
              <Grid item xs={12}>
                <Typography variant={"h4"}> Empty </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button onClick={history.goBack} color={"primary"}>
                  {" "}
                  <Back />
                </Button>
              </Grid>
            </Grid>
          </CssBaseline>
        </Container>
      </div>
    );
  } else
    return (
      <div>
        <Container maxWidth={"sm"}>
          <CssBaseline />
          <div className={classes.main}>
            <div className={classes.title}>
              <Back fontSize={"large"} onClick={history.goBack} />
              <Typography variant={"h5"} align={"center"}>
                <b> Cart </b>{" "}
              </Typography>
            </div>
            <text
            style={{
              align:"center",
              color:"blue",
              fontWeight:"bold",
              fontSize:"2vh"

            }}
            >Apply Discount Coupon if Available Below.</text>
            <Paper elevation={3}>
              <List
                subheader={
                  <ListSubheader disableSticky>
                    <b> {ctx.state.cart.length} Items </b>
                  </ListSubheader>
                }
              >
                {ctx.state.cart.map((cart_item) => (
                  <CartItem key={cart_item.key} cart_item={cart_item} />
                ))}
              </List>
            </Paper>
          </div>
          <Hidden smDown>
            <Fab
              variant={"extended"}
              className={classes.checkoutDesktop}
              color={"primary"}
              onClick={() => {
                history.push({
                  pathname: "/chooseAddress",
                  merchandise_id: ctx.state.merchandise_id,
                });
              }}
            >
              <Proceed /> <small> Checkout </small>
            </Fab>
          </Hidden>
          <Hidden mdUp>
            <Fab
              variant={"extended"}
              className={classes.checkoutMobile}
              color={"primary"}
              onClick={(e) => {
                e.stopPropagation();
                history.push({
                  pathname: "/chooseAddress",
                  merchandise_id: ctx.state.merchandise_id,
                });
              }}
            >
              <Proceed /> <small> Checkout </small>
            </Fab>
          </Hidden>

          <div>
            {coupons.length !== 0 ? (
              <Paper className={classes.coupon} elevation={3}>
                <Typography variant={"subtitle2"} align={"left"} style={{
                  color:"green", fontWeight:"bold", fontSize:"2vh"
                }}>
                  Select coupon (Coupon will apply on Non-Already Discounted Vendors).{" "}
                </Typography>

                <Select
                  style={{ width: "50%" }}
                  variant={"outlined"}
                  fullWidth
                  value={coupon}
                  name="payment"
                  onChange={(e) => {
                    ctx.state.coupon = e.target.value;
                    setCoupon(e.target.value);
                  }}
                >
                  {coupons.map((c, index) => (
                    <MenuItem key={index} value={c.code}>
                      <b> {c.code} &nbsp; </b> <br />
                      <small> {c.description} </small>
                    </MenuItem>
                  ))}
                </Select>
              </Paper>
            ) : (
              <small> </small>
            )}
          </div>

          <div>
            <Paper elevation={3} className={classes.additional_detail}>
              <TextField
                fullWidth
                label="Any instruction to cook"
                placeholder="No mayo please"
                multiline
                rows={3}
                variant={"outlined"}
                onChange={(e) => {
                  ctx.state.additional_detail = e.target.value;
                }}
              />
            </Paper>
          </div>
        </Container>
      </div>
    );
};
