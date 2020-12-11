import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Call, FormatBold, WrapText } from "@material-ui/icons";
import React from "react";
import { Box, Container, CssBaseline } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import { Facebook, Instagram, WhatsApp } from "@material-ui/icons";


export default function NoticePopup(props) {
  const [open, setOpen] = React.useState(true);



  return (
    <Dialog open={open} onBackdropClick={() => setOpen(false)}>
      {/* <DialogTitle ><h3>Dear Customers</h3></DialogTitle> */}
      {/* <DialogTitle >Respected Customers</DialogTitle> */}
      <DialogContent>
      <h2 align="center"   style={{
        color: "red",
        marginBottom: "0rem",
        marginTop:"-1rem",
      }} >Dear Customer</h2>
      <h3>Firstly Thank You Very Much to Being with Get-it.</h3>
      <h3>Get-it Foodie always use to sale all Goods & Services on Restaurants Price. All price for prodct on website is same as Restaurants Menu.</h3>
      <h3>Get-it never show Fake Price other than Restaurants Menu Price.</h3>
      <h3>Get-it honestly charge a nominal delivery charge from you by showing at last billing page, but never take any mix charges in price of your order.</h3>
      <h3>Ask your query on whatsapp or call at 63066 83868</h3>
      {/* <a href="https://wa.me/916306683868">Contect Us</a> */}
      {/* <h3
              fontSize={"large"}
              // className={classes.icons}
              onClick={() => (window.location = "https://wa.me/916306683868")}
      > contact us </h3> */}
       
      </DialogContent>
      <DialogActions>
      <Call
              fontSize={"large"}
              // className={classes.icons}
              onClick={() => (window.location = "tel:+919161419412")}
            />
      <WhatsApp
              fontSize={"large"}
              // className={classes.icons}
              onClick={() => (window.location = "https://wa.me/916306683868?text=*Hi, I Need Support.*")}
            />
      <h4
              fontSize={"large"} style={{
              // marginRight: "7rem"
              color : "blue"
              }}
              // className={classes.icons}
              
              onClick={() => (window.location = "https://wa.me/916306683868?text=*Hi, I Need Support.*")}
              // "https://wa.me/916306683868?text=Hi"
              // <a href="tel:123-456-7890p123">CLICK TO CALL</a>
      > Click For Help </h4>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
     
  );
}