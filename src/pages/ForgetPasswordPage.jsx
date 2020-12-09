import React, { useContext, useState, useEffect } from "react";
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
import { GlobalContext } from "../GlobalContext";
import { BASE_URL } from "../constant";
import Axios from "axios";
import firebase from "./firebase";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link to="/">Getitfoodie.com</Link> {new Date().getFullYear()}
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

export default function ForgetPasswordPage(props) {
  const history = useHistory();
  const classes = useStyles();
  const [mobile, setMobile] = useState("");
  const [mobileFieldError, setMobileFieldError] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false);

  if (props.location.mobile) {
    setMobile(props.location.mobile);
  }

  const handleInput = (e) => {
    if (e.target.name === "mobile") {
      setMobile(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (false) {
      setMobileFieldError(true);
      return; //required
    } else {
      setMobileFieldError(false);
    }

    var appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber("+91" + mobile, appVerifier)
      .then(function (confirmationResult) {
        window.confirmationResult = confirmationResult;
        Axios.post(`${BASE_URL}/forgot-password/`, {
          mobile_number: mobile.mobile,
        })
          .then(history.replace({ pathname: "/verify", mobile: mobile }))
          .catch((error) => {
            setDisableSubmit(false);
          });
      })
      .catch(function (error) {
        console.log({ error });
      });
    setDisableSubmit(true);
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
            value={props.location.mobile}
            disabled={Boolean(props.location.mobile)}
          />

          <Button
            fullWidth
            disabled={disableSubmit}
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            id="f-captcha"
          >
            Reset Password
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/help" variant="body2">
                Need Help.? Call Us on 6306683868
              </Link>
            </Grid>
            <Grid item>
              <Link to="/login" variant="body2">
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
