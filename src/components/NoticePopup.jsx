import { DialogActions } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";

export default function NoticePopup(props) {
  const [open, setOpen] = React.useState(true);

  return (
    <Dialog open={open} onBackdropClick={() => setOpen(false)}>
      <DialogTitle>Set backup account</DialogTitle>


      

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