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
        color: "purple",
        fontWeight: 'bold',
        marginBottom: "0rem",
        textDecorationLine: 'underline',
        marginTop:"-1rem",
      }} >Dear Foodies</h2>
      <h4
      // style={{
      // color:"blue"
      // }}
      >You are Most Welcome in Tomestry.</h4>
      <h3
      style={{
        color:"blue"
        }}>Please Use 20 % Offer Coupon on Cart Page.</h3>
      {/* <h3>Tomestry Foodie always use to sale all Goods & Services on Restaurants Price. All price for prodct on website is same as Restaurants Menu.</h3>
      <h3>Tomestry never show Fake Price other than Restaurants Menu Price.</h3> */}
      <h4
      // style={{
      //   color:"purple"
      //   }}
        >Ask your query on whatsapp or call at 8604850890</h4>
      {/* <a href="https://wa.me/918604850890">Contect Us</a> */}
      {/* <h3
              fontSize={"large"}
              // className={classes.icons}
              onClick={() => (window.location = "https://wa.me/918604850890")}
      > contact us </h3> */}
       
      </DialogContent>
      <DialogActions>
      <Call
              fontSize={"large"}
              style={{
                color:"orange"
                }}
              // className={classes.icons}
              onClick={() => (window.location = "tel:+918604850890")}
            />
      <WhatsApp
              fontSize={"large"}
              style={{
                color:"green"
                }}
              // className={classes.icons}
              onClick={() => (window.location = "https://wa.me/918604850890?text=*Hi, I Need Support.*")}
            />
      <h4
              fontSize={"large"} style={{
              // marginRight: "7rem"
              color : "brown"
              }}
              // className={classes.icons}
              
              onClick={() => (window.location = "https://wa.me/918604850890?text=*Hi, I Need Support.*")}
              // "https://wa.me/918604850890?text=Hi"
              // <a href="tel:8604850890p123">CLICK TO CALL</a>
      > Click For Help </h4>
        <Button
          variant={"contained"}
          style={{
            color:"yellow"
            }}
          color={"primary"}
          onClick={() => setOpen(false)}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
     
  );
}