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




// import { DialogActions } from "@material-ui/core";
// import Button from "@material-ui/core/Button";
// import Dialog from "@material-ui/core/Dialog";
// import DialogTitle from "@material-ui/core/DialogTitle";
import { Call, FormatBold, WrapText } from "@material-ui/icons";
// import React from "react";
// import { Box, Container, CssBaseline } from "@material-ui/core";
// import DialogContent from "@material-ui/core/DialogContent";
// import { Facebook, Instagram, WhatsApp } from "@material-ui/icons";


const useStyles = makeStyles(theme => ({
  root: {
    // marginTop: theme.spacing(2),
    // textAlign: "center",
    // background: "#fff",
    // color: "#fff",
    // zIndex: 99,
    // position: "relative"
  },
  item: {
    justifyContent: "center",
    // padding: theme.spacing(8, 1, 1, 1)
  },
  icons: {
    // padding: theme.spacing(0.3)
  }
}));




export default props => {
    const [text, setText] = React.useState(null)
    const [showDialog, setShowDialog] = React.useState(false)
  const history = useHistory();
  const classes = useStyles();
  return (
    <CssBaseline>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} md={4} className={classes.item}>
            <h4
            style={{
                color: "red",
                textAlign:"center"
                
            }}
            
            onClick={()=>{
                setText("Process To Cancel My Order.")
                setShowDialog(true)
            }}>How to Cancel My Order?</h4>
          </Grid>
        </Grid>
        <Dialog
          onBackdropClick={() => setShowDialog(false)}
          open={showDialog}
          disableBackdropClick={false}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle> {text }</DialogTitle>
          <DialogContent>
          
          <text
          style={{
            fontWeight:"bold",
            

          }}
          
          >Tomestry Order Cancellation Process Work as Below Pattern :-</text>
          <br/>
          <br/>
          <text>After Placing Order there will first 2 Mints To cancel order.</text>
          <br/>
          <br/>
          <text>You have to Call us on our Tomestry 
            <text
              onClick={() => (window.location = "tel:+918604850890")}
              style={{color:"blue"
            ,}}
      > Helpline No. </text> 
      <Call
              fontSize={"2vh"}
              
              style={{
                color:"blue",
              }}
              onClick={() => (window.location = "tel:+918604850890")}
            />  and Inform a Valid Reason of Order Cancelletion.</text>
          <br/>
          <br/>
          <text>Your Order can't be Cancel After 2 Mints, if you cancel order after 2 Mints or Refuse to Accept Order then 100% of Order Value will be Charges on Your next Order as a Order Cancellation Fine Charge.</text>
          

          
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