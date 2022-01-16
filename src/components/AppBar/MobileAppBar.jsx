import {
  AppBar,
  Badge,
  Chip,
  CssBaseline,
  Drawer,
  Fab,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Close, Menu, ShoppingCart } from "@material-ui/icons";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../../GlobalContext";
import SideList from "./sidelist";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "primary",
    color: "primary",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  track: {
    marginLeft: "15vw",
  },

  close: {
    position: "fixed",
    bottom: 50,
    left: 50,
  },
}));

export default (props) => {
  const ctx = React.useContext(GlobalContext);
  const [drawer, setDrawer] = React.useState(false);
  const classes = useStyle();
  const history = useHistory();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position={"fixed"}
        className={classes.root}
        color={"primary"}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
            onClick={() => {
              setDrawer(!drawer);
            }}
          >
            <Menu style={{ color: "#fff", position: "relative" }} />
          </IconButton>

          <Chip
            className={classes.track}
            color="primary"
            label="Track My Order"
            onClick={() => {
              history.push("/orderHistory");
            }}
          />

          <Typography variant="h6" className={classes.title}></Typography>
          <IconButton component={Link} to={"/cart"}>
            <Badge badgeContent={ctx.state.cart.length} color="primary">
              <ShoppingCart style={{ color: "#fff" }} />
            </Badge>
          </IconButton>
          <Drawer open={drawer} anchor={"left"}>
            <SideList accessToken={ctx.state.accessToken} title={"Hi,"} />
            <Fab
              variant={"extended"}
              className={classes.close}
              color={"secondary"}
              onClick={() => setDrawer(false)}
            >
              <Close />
              Close
            </Fab>
          </Drawer>
          {/* <Box className={classes.orderStatus}>
            <Typography variant={"h6"}> Order Status</Typography>
          </Box> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};
