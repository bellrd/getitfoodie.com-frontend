import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormatBold } from "@material-ui/icons";
import React from "react";


export default function NoticePopup(props) {
  const [open, setOpen] = React.useState(true);



  return (
    <Dialog open={open} onBackdropClick={() => setOpen(false)}>
      {/* <DialogTitle ><h3>Dear Customers</h3></DialogTitle> */}
      {/* <DialogTitle >Respected Customers</DialogTitle> */}
      <h2 align="center">Dear Customer</h2>
      <h3>Firstly Thank You Very Much to Being with Get-it.</h3>
      <h3>Get-it Foodie always use to sale all Goods & Services on Restaurants Price. All price for prodct on website is same as Restaurants Menu.</h3>
      <h3>Get-it never show Fake Price other than Restaurants Menu Price.</h3>
      <h3>Get-it honestly charge a nominal delivery charge from you by showing at last billing page, but never take any mix charges in price of your order.</h3>
      <h3>Ask your query on whatsapp or call at 63066 83868</h3>
      {/* <a href="/">Back to homepage</a> */}
      
      <DialogActions>
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