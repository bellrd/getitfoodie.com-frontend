import React, { useContext, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Axios from "axios";
import { BASE_URL } from "../constant";
import { GlobalContext } from "../GlobalContext";
import firebase from "./firebase";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Tomestry.com</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    padding: "30px",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    fontWeight: "bold",
    "& input": {
      color: "#404040",
      letterSpacing: "0.1rem",
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "12px",
    fontWeight: "bold",
    fontSize: "17px",
    textTransform: "Capitalize",
  },
}));

export default function VerifyPage(props) {
  const classes = useStyles();
  const [verifyData, setVerifyData] = useState({ mobile: "" || "", otp: "" });
  const [mobileFieldError, setMobileFieldError] = useState(false);
  const [otpFieldError, setOtpFieldError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);
  const ctx = useContext(GlobalContext);
  const history = useHistory();
  // workaround fix
  if (props.location.mobile) {
    verifyData.mobile = props.location.mobile.mobile;
    if (
      verifyData.mobile == undefined ||
      verifyData.mobile == null ||
      verifyData.mobile == "undefined" ||
      verifyData.mobile == "" ||
      verifyData.mobile == "null"
    )
      verifyData.mobile = props.location.mobile;
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (e) => {
    if (e.target.name === "mobile") {
      setVerifyData({ ...verifyData, mobile: e.target.value });
    } else if (e.target.name === "otp") {
      setVerifyData({ ...verifyData, otp: e.target.value });
    } else {
      console.log("wtf level 101");
    }
  };

  const handleSubmit = () => {
    setDisableSubmit(true);
    if (false) {
      setMobileFieldError(true);
      return; //required
    } else {
      setMobileFieldError(false);
    }
    if (verifyData.otp.length === 0) {
      setOtpFieldError(true);
      return; // don't mess
    } else {
      setOtpFieldError(false);
      setDisableSubmit(false);
    }

    window.confirmationResult
      .confirm(verifyData.otp)
      .then((result) => {
        console.log("otp is correct");
      })
      .catch((err) => {
        setDisableSubmit(false);
        alert("Otp verification failed");
        return;
      });

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((t) => {
        Axios.post(`${BASE_URL}/verify/`, {
          mobile_number: verifyData.mobile,
          otp: verifyData.otp,
          token: t,
        })
          .then((response) => {
            ctx.dispatch({ type: "LOGIN", payload: response.data });
            //history.replace("/");
            window.location = "https://tomestry.com/";
          })
          .catch((error) => {
            alert("Otp verification failed.");
            setDisableSubmit(false);
          });
      })
      .catch((e) => {
        console.log("error retrieving firbase token for the user ");
        setDisableSubmit(false);
      });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" fontWeight="bold">
          Verify mobile number
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            error={mobileFieldError}
            helperText={mobileFieldError ? "Invalid mobile number." : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="mobile"
            label="Mobile number"
            name="mobile"
            type="tel"
            autoComplete="mobile"
            autoFocus
            onChange={handleInput}
            value={verifyData.mobile}
            defaultValue={verifyData.mobile}
            disabled={Boolean(props.location.mobile)}
          />
          <TextField
            error={otpFieldError}
            helperText={otpFieldError ? "Blank otp not allowed" : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="otp"
            label="OTP"
            id="otp"
            onChange={handleInput}
          />
          <Button
            fullWidth
            disabled={disableSubmit}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Verify
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/help" variant="body2">
                Need Help ?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Back"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
