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
    marginBottom: theme.spacing(1),
    display: "flex",
    width: "auto",
    justifyContent: "space-between",
    minHeight: 90,
    maxHeight: 180,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "right",
  },
  content: {},
  cover: {
    margin: theme.spacing(1),
    width: 120,
  },
  controls: {
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  offer: {
    alignItems: "center",
    marginTop:theme.spacing(-3),
    color:"blue",
    marginBottom:theme.spacing(0),
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
      <CardMedia
        className={classes.cover}
        // image={item.item_photo || `${BASE_URL_IMAGE}/media/default_image.jpeg`}
        image={item.item_photo}
        title="Item photo"
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <small>
            <strong>{item.name} </strong>
          </small>
          <small> {item.tags.includes("VEG") ? "VEG" : "NON-VEG"} </small>
          <br />
          <small>
            {item.prices[0].size} at {item.prices[0].regular_mrp}
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
        disableBackdropClick
        fullWidth={true}
        maxWidth={"sm"}
      >
        <DialogTitle> Mark Size </DialogTitle>
        <div>
        <DialogTitle
        ><h6 className={classes.offer}>
        Discount Coupon is At Next Page.</h6></DialogTitle>
        </div>
        <DialogContent>
          <List>
            {item.prices.map((price, index) => {
              const itemIndex = ctx.state.cart.findIndex(
                (cartitem) =>
                  cartitem.id === item.id && cartitem.size === price.size
              );
              return (
                <ListItem key={index}>
                  <ListItemText>
                    {" "}
                    <small>
                      {price.size} <b> {price.regular_mrp} </b>{" "}
                    </small>
                  </ListItemText>
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
