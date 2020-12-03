import React from "react";
import { useHistory } from "react-router-dom";
import {
  Link,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  CssBaseline,
  Grid,
  makeStyles
} from "@material-ui/core";
import { Facebook, Instagram, WhatsApp } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    textAlign: "center",
    background: "#000",
    color: "#fff",
    zIndex: 99,
    position: "relative"
  },
  item: {
    justifyContent: "center",
    padding: theme.spacing(8, 1, 1, 1)
  },
  icons: {
    padding: theme.spacing(0.3)
  }
}));

const REFUND_TEXT =
  "order can not be cancelled Once confirmed. As a general rule you shall not be cancel your order once you have received confirmation of the same. If you cancel your order after it has been confirmed, Get-it shall have a right to charge you cancellation fee of a minimum INR 50 upto the order value, with a right to either not to refund the order value or recover from your subsequent order, the complete cancellation fee, as applicable, to compensate our restaurant and delivery partners. Get-it shall also have right to charge you cancellation fee for the orders cancelled by Get-it for the reasons specified under clause 1(iii) of this cancellation and refunds policy. In case of cancellations for the reasons attributable to Get-it or its restaurant and delivery partners, Get-it shall not charge you any cancellation fee. However, in the unlikely event of an item on your order being unavailable, we will contact you on the phone number provided to us at the time of placing the order and inform you of such unavailability. In such an event you will be entitled to cancel the entire order and shall be entitled to a refund in accordance with our refund policy. We reserve the sole right to cancel your order in the following circumstance: failure to contact you by phone or email at the time of confirming the order booking; failure to deliver your order due to lack of information, direction or authorization from you at the time of delivery; or unavailability of all the items ordered by you at the time of booking the order; or unavailability of all the items ordered by you at the time of booking the order; or Refunds You shall be entitled to a refund only if you pre-pay for your order at the time of placing your order on the Platform and only in the event of any of the following circumstances: your order packaging has been tampered or damaged at the time of delivery; us cancelling your order due to (1) your delivery location following outside our designated delivery zones; (2) failure to contact you by phone or email at the time of confirming the order booking; or (3) failure to contact you by phone or email at the time of confirming the order booking; or you cancelling the order at the time of confirmation due to unavailability of the items you ordered for at the time of booking. Our decision on refunds shall be at our sole discretion and shall be final and binding. All refund amounts shall be credited to your account within 3-4 business days in accordance with the terms that may be stipulated by the bank which has issued the credit/debit card.";
const ABOUT_TEXT =
  "Get is a low profit food and delivery service company active near BBD university. It has ties with various local shop and restaurents and delivers their food and item to it's customer with no delivery charge on order above 99";

export default props => {
    const [text, setText] = React.useState(null)
    const [showDialog, setShowDialog] = React.useState(false)
  const history = useHistory();
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={6} md={4} className={classes.item}>
            <Typography
              variant={"h5"}
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              {" "}
              Quick Links
            </Typography>
            <h4
              onClick={() => {
                history.push(":/");
              }}
            >
              Contact Us{" "}
            </h4>

            <h4
              onClick={() => {
                history.push("/profile");
              }}
            >
              Profile{" "}
            </h4>
            <h4
              onClick={() => {
                history.push("/cart");
              }}
            >
              {" "}
              Cart{" "}
            </h4>
            <h4
              onClick={() => {
                history.push("/orderHistory");
              }}
            >
              {" "}
              OrderHistory
            </h4>
          </Grid>

          <Grid item xs={6} md={4} className={classes.item}>
            <Typography
              variant={"h5"}
              style={{ textDecoration: "underline", fontWeight: "bolder" }}
            >
              {" "}
              Disclaimer{" "}
            </Typography>
            <h4 onClick={()=> {
                setText("REFUND")
                setShowDialog(true)
            }}> Terms & Condition</h4>
            <h4 onClick={()=>{
                setText("REFUND")
                setShowDialog(true)
            }}> Refund Policy</h4>
            <h4 onClick={() => {
                setText("ABOUT")
                setShowDialog(true)
            }}> About </h4>
          </Grid>
          <Grid item xs={12} md={4} className={classes.item}>
            <Typography> Connect with us+</Typography>
            <Facebook
              fontSize={"large"}
              className={classes.icons}
              onClick={() =>
                (window.location = "https://facebook.com/getitfoodieteam/")
              }
            />
            <Instagram
              fontSize={"large"}
              className={classes.icons}
              onClick={() =>
                (window.location = "https://instagram.com/getitfoodie/")
              }
            />
            <WhatsApp
              fontSize={"large"}
              className={classes.icons}
              onClick={() => (window.location = "https://wa.me/916306683868")}
            />
          </Grid>
        </Grid>
        <small>
          <Link to={"/"}>KGBROTHERS ECOMMERCE SERVICES PVT. LTD.</Link>
        </small>
        <Dialog
          open={showDialog}
          disableBackdropClick={false}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle> {text }</DialogTitle>
          <DialogContent>
          <Typography variant={"subtitle2"}>
              {text === "REFUND"? REFUND_TEXT : ABOUT_TEXT }
          </Typography>

          </DialogContent>
          <DialogActions>
            <Button
              variant={"contained"}
              color={"primary"}
              onClick={() => setShowDialog(false)}
            >
            Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </CssBaseline>
  );
};
