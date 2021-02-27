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

const DELIVERY_CHARGE =
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
          <Grid item xs={12} md={4} className={classes.item}>
            <h4
            style={{
                color: "blue",
                textAlign:"center"
                
            }}
            
            onClick={()=>{
                setText("DELIVERY CHARGE")
                setShowDialog(true)
            }}> Click To Know Delivery Charge Pattern</h4>
          </Grid>
        </Grid>
        <Dialog
          open={showDialog}
          disableBackdropClick={false}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <DialogTitle> {text }</DialogTitle>
          <DialogContent>
          
          <text
          style={{
            fontWeight:"bold"

          }}
          
          >Tomestry Delivery Charges Work as Below Pattern :-</text>
          <br/>
          <br/>
          <text>Above on 100 Rs. of Order = 20 Rs. Delivery Charge.</text>
          <br/>
          <br/>
          <text>Between 100 To 50 Rs. = 25 Rs Delivery Charge.</text>
          <br/>
          <br/>
          <text>Between 49 To 20 Rs. = 30 Rs. Delivery Charge</text>
          <br/>
          <br/>
          <text>Minimum Order Amount is 19 Rs.</text>
          
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

