import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
  ListItemSecondaryAction
} from "@material-ui/core";
import {
  ContactSupport,
  Create,
  ExitToApp,
  Help,
  History,
  Lock,
  Person,
  ShoppingCart,
  AccountBalanceWallet as Wallet
} from "@material-ui/icons";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { BASE_URL } from "../../constant";
import { GlobalContext } from "../../GlobalContext";

const useStyle = makeStyles(theme => ({
  list: {
    width: 200
  },
  logo: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(2),
    color: theme.palette.primary.main
  }
}));

export default props => {
  const ctx = useContext(GlobalContext);
  useEffect(() => {
    if (
      props.accessToken != null &&
      props.accessToken != "Token null" &&
      props.accessToken != "Token undefined"
    ) {
      Axios.get(`${BASE_URL}/profile/`, {
        headers: { Authorization: ctx.state.accessToken }
      })
        .then(response => setProfile(response.data))
        .catch(err =>
          console.log("Unable to retrieve profile make sure you are logged in.")
        );
    }
  }, []);
  const [profile, setProfile] = useState({
    first_name: "Hi",
    last_name: " !",
    wallet: 0
  });
  const classes = useStyle();
  if (
    props.accessToken == null ||
    props.accessToken === "Token null" ||
    props.accessToken === "Token undefined"
  ) {
    return (
      <div className={classes.list} role="presentation">
        <Typography variant={"h6"} className={classes.logo}>
          Hi,
        </Typography>
        <List>
          <Button
            component={Link}
            to={"/login"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
          </Button>
          <Button
            component={Link}
            to={"/register"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <Create />
              </ListItemIcon>
              <ListItemText>Register</ListItemText>
            </ListItem>
          </Button>

          <Button
            component={Link}
            to={"/forgotPassword"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText>Forgot Password</ListItemText>
            </ListItem>
          </Button>
        </List>

        <Divider />
        <List>
          <Button
            component={Link}
            to={"/help"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <ContactSupport />
              </ListItemIcon>
              <ListItemText>Contact us</ListItemText>
            </ListItem>
          </Button>
        </List>
      </div>
    );
  } else {
    return (
      <div className={classes.list} role="presentation">
        <Typography variant={"h4"} className={classes.logo}>
          {profile.first_name + " " + profile.last_name}
        </Typography>

        <Divider />
        <List>
          <Button
            component={Link}
            to={"/profile"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText> Profile </ListItemText>
            </ListItem>
          </Button>

          <Button
            fullWidth={true}
            size={"small"}
            component={Link}
            to={"/cart"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <ShoppingCart />
              </ListItemIcon>
              <ListItemText> Cart </ListItemText>
            </ListItem>
          </Button>

          <Button
            component={Link}
            to={"/orderHistory"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <History />
              </ListItemIcon>
              <ListItemText>Order History</ListItemText>
            </ListItem>
          </Button>

          <Divider />
          <ListItem>
            <Button
              component={Link}
              to={"/logout"}
              fullWidth={true}
              size={"small"}
              style={{ textTransform: "none" }}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </Button>
          </ListItem>
          <Divider />
          <Button
            component={Link}
            to={"#"}
            fullWidth={true}
            size={"small"}
            style={{ textTransform: "none" }}
          >
            <ListItem>
              <ListItemIcon>
                <Wallet  color={"primary"}/>
              </ListItemIcon>
              <ListItemText>Wallet </ListItemText> <br />
                <b>{profile.wallet}</b>
            </ListItem>
          </Button>
        </List>
      </div>
    );
  }
};
