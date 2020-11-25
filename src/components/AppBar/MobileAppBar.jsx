import React from "react"
import {
    AppBar,
    Badge,
    Box,
    Button,
    CssBaseline,
    Drawer,
    IconButton,
    Fab,
    ListItem,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu, Close, ShoppingCart} from "@material-ui/icons";
import {GlobalContext} from "../../GlobalContext";
import Axios from "axios";
import {BASE_URL} from "../../constant";
import SideList from "./sidelist"
import {Link} from "react-router-dom"

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        background: "#000",
        color: "#fff",
    },
    menuButton: {
        marginRight: theme.spacing(2)

    },
    title: {
        flexGrow: 1,
    },
    close: {
        position:"fixed",
        bottom:50,
        left:50,
    },


}));


export default (props) => {

    const ctx = React.useContext(GlobalContext);
    const [drawer, setDrawer] = React.useState(false);
    const classes = useStyle();


    return (

        <React.Fragment>
            <CssBaseline/>
            <AppBar position={"fixed"} className={classes.root} color={"primary"} elevation={0}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu" onClick={() => {
                        setDrawer(!drawer)
                    }}>
                        <Menu style={{color: "#fff", position: "relative"}}/>
                    </IconButton>

                    <Typography variant="h6" className={classes.title}>
                    </Typography>
                    <IconButton component={Link} to={"/cart"}
                    >
                        <Badge badgeContent={ctx.state.cart.length} color="primary">
                            <ShoppingCart style={{color: "#fff"}}/>
                        </Badge></IconButton>
                    <Drawer open={drawer} anchor={"left"}>

                        <SideList accessToken={ctx.state.accessToken}
                                  title={"Hi,"}/>
                        <Fab variant={"extended"} className={classes.close} color={"secondary"}
                             onClick={() => setDrawer(false)}>
                            <Close/>
                            Close
                        </Fab>
                    </Drawer>
                    <Box className={classes.orderStatus} hidden={!props.orderStatus}>
                        <Typography variant={"h6"}> Order Status</Typography>
                    </Box>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};