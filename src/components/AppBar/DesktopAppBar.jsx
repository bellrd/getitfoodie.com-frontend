import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {GlobalContext} from "../../GlobalContext";
import {AppBar, Badge,Box, Button, IconButton, Menu, MenuItem, Toolbar, Typography} from "@material-ui/core"
import {Link} from "react-router-dom";
import {ShoppingCart} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginBottom:theme.spacing(8)
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontWeight: "bolder",
    },
    cart: {
        marginRight: theme.spacing(2)
    },
    buttons: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(2),
        textTransform: "capitalize"
    },
    orderStatus:{
        marginLeft:0,
        marginRight:0,
        textDecoration:"underline",
        position:"fixed",
        right:"50%",
    }

}));

export default function MenuAppBar(props) {
    const ctx = React.useContext(GlobalContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position={"fixed"} color={"secondary"} elevation={3}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        GetIt
                    </Typography>
                    {ctx.state.accessToken != null && ctx.state.accessToken != "Token null" &&  ctx.state.accessToken != "Token undefined" ? (
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem component={Link} to={"/profile"}> Profile</MenuItem>
                                <MenuItem component={Link} to={"/orderHistory"}> Order History</MenuItem>
                                <MenuItem component={Link} to={"/logout"}> Logout</MenuItem>
                            </Menu>
                        </div>
                    ) : (
                        <div className={classes.buttons}>
                            <Button color="inherit" component={Link} to={"/login"}> Login </Button>
                            <Button color="inherit" component={Link} to={"/register"}> Register </Button>
                        </div>
                    )}
                    <Box className={classes.orderStatus} hidden={!props.orderStatus}>
                        <Typography variant={"h6"}> Order Status</Typography>
                    </Box>
                    <Button component={Link} to={"/cart"}>
                        <Badge badgeContent={ctx.state.cart.length} color="primary">
                            <ShoppingCart style={{color: "white"}}/>
                        </Badge>
                    </Button>

                </Toolbar>
            </AppBar>
        </div>
    );
}
