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
  "Uploading Soon";
const ABOUT_TEXT =
  "Uploading Soon";

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
                history.push("/cart");
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
                (window.location = "https://facebook.com/")
              }
            />
            <Instagram
              fontSize={"large"}
              className={classes.icons}
              onClick={() =>
                (window.location = "https://instagram.com/")
              }
            />
            <WhatsApp
              fontSize={"large"}
              className={classes.icons}
              onClick={() => (window.location = "https://wa.me/919161419412")}
            />
          </Grid>
        </Grid>
        <small>
          <Link to={"/"}>Tomestry.com</Link>
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
