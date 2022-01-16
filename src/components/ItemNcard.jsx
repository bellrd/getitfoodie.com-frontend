import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import { BASE_URL_IMAGE } from "../constant";
import { GlobalContext } from "../GlobalContext";

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: theme.spacing(0),
    // display: "flex",
    // width: "auto",
    justifyContent: "space-between",
    minHeight: 90,
    maxHeight: 180,
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
  },
  controls: {
    marginTop: theme.spacing(2),
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  offer: {
    alignItems: "center",
    marginTop: theme.spacing(-3),
    color: "blue",
    marginBottom: theme.spacing(0),
    // paddingLeft: theme.spacing(1),
    // paddingBottom: theme.spacing(2),
  },
}));

export default (props) => {
  const ctx = useContext(GlobalContext);
  const [showOptions, setShowOptions] = useState(false);
  const classes = useStyles();

  const item = props.item;
  const category_id = props.category_id;
  const merchandise_id = props.merchandise_id;

  return (
    <Card className={classes.card} elevation={5} variant={"elevation"}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <small>
            <strong>{item.name} </strong>
          </small>
          <small> {item.tags.includes("VEG") ? "VEG" : ""} </small>
          <small> {item.tags.includes("NON VEG") ? "NON-VEG" : ""} </small>
          <br />
          <small>
            {item.prices[0].size} at {<span><span
           style={{
             color: "green"
           }}
           >
              Rs {item.prices[0].getit_mrp} {" "}</span>
              <del
              style={{
                color: "red",
                fontSize:"2vh"}}
              >{item.prices[0].regular_mrp}</del>
              </span>}
          </small>
        </CardContent>
        <div className={classes.controls}>
          <ButtonGroup size={"small"} color={"secondary"} variant={"outlined"}>
            <IconButton
              onClick={() => {
                setShowOptions(true);
              }}
            >
              <Remove />
            </IconButton>

            <Button
              variant={"contained"}
              color={"primary"}
              disableElevation={false}
            >
              {
                ctx.state.cart
                  .filter((temp) => temp.id === item.id)
                  .reduce((a, b) => ({ quantity: a.quantity + b.quantity }), {
                    quantity: 0,
                  }).quantity
              }{" "}
            </Button>

            <IconButton
              onClick={() => {
                setShowOptions(true);
              }}
            >
              <Add />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>

      <Dialog
        open={showOptions}
        onBackdropClick={() => setShowOptions(false)}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle> Define Size </DialogTitle>
        <div>
          <DialogTitle>
            <h6 className={classes.offer}>Coupon is At Next Page.</h6>
          </DialogTitle>
        </div>
        <DialogContent>
          <List>
            {item.prices.map((price, index) => {
              const itemIndex = ctx.state.cart.findIndex(
                (cartitem) =>
                  cartitem.id === item.id && cartitem.size === price.size
              );
              return (
                <>
                  <ListItem key={index}>
                    {/* <ListItemText>
                      {" "}
                      <small>
                        {price.size} <b> ₹{price.regular_mrp} </b> <br />
                        {price.additional_detail}
                      </small>
                    </ListItemText> */}


                    {/* <ListItemText primary={
                      <p> {price.size}  ₹ {price.regular_mrp} </p>
                    } secondary={
                      <small> <br />{price.additional_detail} </small>
                    } />
                    <ListItemSecondaryAction> */}


                    <ListItemText primary={
                      <small> <b >{price.size}</b> <b>   <br></br>  <small style={{color:"green"}}>Rs. {price.getit_mrp} </small> </b> <del style={{color:"red"}}> {price.regular_mrp}</del>{" "}</small>
                    } secondary={
                      <small> <br />{price.additional_detail} </small>
                    } />
                    <ListItemSecondaryAction>
                      <ButtonGroup
                        size={"small"}
                        color={"secondary"}
                        variant={"outlined"}
                      >
                        <IconButton
                          onClick={() => {
                            ctx.dispatch({
                              type: "REMOVE_ONE_ITEM",
                              payload: {
                                id: item.id,
                                name: item.name,
                                size: price.size,
                                category_id: category_id,
                                price: price.regular_mrp,
                                merchandise_id: merchandise_id,
                              },
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
                          {itemIndex !== -1
                            ? ctx.state.cart[itemIndex].quantity
                            : "0"}{" "}
                        </Button>

                        <IconButton
                          onClick={() => {
                            ctx.dispatch({
                              type: "ADD_ONE_ITEM",
                              payload: {
                                id: item.id,
                                name: item.name,
                                size: price.size,
                                price: price.regular_mrp,
                                category_id: category_id,
                                merchandise_id: merchandise_id,
                              },
                            });
                          }}
                        >
                          <Add />
                        </IconButton>
                      </ButtonGroup>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <br />
                </>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={() => setShowOptions(false)}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};
