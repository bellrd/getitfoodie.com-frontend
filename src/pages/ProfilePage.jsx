import React, { useContext, useEffect, useState } from "react";
import {
    Container,
    CssBaseline,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    ListSubheader,
    makeStyles,
    Paper,
    Switch,
    Typography,
} from "@material-ui/core";
import { KeyboardBackspaceRounded as Back } from "@material-ui/icons"
import { useHistory, Redirect } from "react-router-dom"
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import { BASE_URL } from "../constant";
import { GlobalContext } from "../GlobalContext";


const useStyles = makeStyles(theme => ({
    main: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: theme.spacing(3),
    },
    info: {
        padding: theme.spacing(2)
    },
    update: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(8)
    },
    form: {},
    submit: {
        marginTop: theme.spacing(0),
        borderRadius: 0
    }
}));


export default (props) => {

    const ctx = useContext(GlobalContext);
    const [profile, setProfile] = useState({});
    const [showPassword, toggleShowPassword] = useState(false);
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        Axios.get(`${BASE_URL}/profile/`, { headers: { Authorization: ctx.state.accessToken } }).then(
            response => {
                setProfile(response.data);
            }
        ).catch(error => {
            alert("Failed loading profile")
        });

    }, []);

    const handleInput = e => {
        if (e.target.name === "password1") {
            setPassword1(e.target.value)
        } else if (e.target.name === "password2") {
            setPassword2(e.target.value)
        } else {
            console.log("level 101");
        }
    };

    const handleSubmit = () => {
        if (password1 !== password2) {
            alert("Password doesn't match")
            return
        }

        if (password2.length < 5) {
            alert("Try longer password")
            return
        }
        Axios.post(`${BASE_URL}/user/set_password/`, {
            mobile: profile.mobile,
            password1: password2,
            password2: password2
        }, { headers: { Authorization: ctx.state.accessToken } }).then(
            response => {
                alert("Password updated")
            })
            .catch(error => {
                alert("Failed to update password")
            });
    };

    if (!ctx.state.accessToken || ctx.state.accessToken == "Token null" || ctx.state.accessToken == "Token undefined") {
        return <Redirect to={{ pathname: "/login", next: "/profile" }} />
    } else

        return (
            <div>
                <Container maxWidth={"sm"}>
                    <CssBaseline />

                    <div className={classes.main}>
                        <div className={classes.title}>
                            <Back fontSize={"large"} onClick={history.goBack} />

                        </div>

                        <Paper className={classes.info}  elevation={3}>
                            <List subheader={<ListSubheader disableSticky> {profile.full_name}</ListSubheader>}>
                                {/* <ListItem>
                                    <ListItemText> Email: </ListItemText>
                                    <ListItemSecondaryAction onClick={() => {
                                        const newEmail = prompt("Enter Email");
                                        setProfile({...profile, email: newEmail})
                                    }}>
                                        {profile.email || "Not available."}
                                    </ListItemSecondaryAction>
                                </ListItem> */}
                                <ListItem>
                                    <ListItemText> Wallet </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Typography variant={"subtitle2"}> {profile.wallet}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <ListItem>
                                    <ListItemText> Name </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Typography variant={"subtitle2"}> {profile.first_name + " " + profile.last_name}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>

                                <ListItem>
                                    <ListItemText> My referral code </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Typography variant={"subtitle2"}> {profile.referral_code}</Typography>

                                    </ListItemSecondaryAction>
                                </ListItem>

                                <ListItem>
                                    <ListItemText
                                    > My Successful Referral Connections </ListItemText>
                                    <ListItemSecondaryAction>
                                        <Typography variant={"subtitle2"}> {profile.refer_count}</Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
  
                            <Button variant="contained" color="primary" onClick={() => {
                                console.log(navigator.share)
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'Referral Code',
                                        text: 'Hi, I am Tomestry Food Delivery Company User, '  + profile.first_name + " " + profile.last_name + '. Please Register your Tomestry Account using my Referral Code. If you use my code, we both will get Tomestry Cash back of *10 Rs.* after your 1st Successful Order.  *My Referral Code is* ' +profile.referral_code ,
                                        // text: 'I am Tomestry Food Delivery User. ' + profile.first_name  + " " + profile.last_name,
                                        // text: 'Please Register your Tomestry Account using my Referral Code. If you use my code, we both will get Tomestry Cash back of 10 Rs. after your 1st Successful Order. ' + profile.referral_code,
                                        // text: 'Tomesty use to deliver all its goods and services on Shop/Restaurent Price. Tomestry never takes any increased price on item than the price is at Restaurent. ',
                                        // text: 'Tomestry use to deliver :- ',
                                        // text: 'Family Food. ',
                                        // text: 'Chinese Foods ',
                                        // text: 'Rolls ',
                                        // text: 'Shake & Juices ',
                                        // text: 'Green Vegetables ',
                                        // text: 'Tiffin Services ',
                                        // text: 'Veg & Non-Veg all type of Foods. ',
                                        // text: 'Web & Android Apps Developments ',
                                        url: 'https://tomestry.com',
                                    })
                                        .then(() => console.log('Successful share'))
                                        .catch((error) => console.log('Error sharing', error));
                                }
                                else {
                                    alert(`${profile.referral_code} share this code`)
                                }
                            }
                            }>
                                Share Referral
                            </Button>
                            
                           
                        </Paper>
                        <text
                        style={{

                        }}
                        
                        >If You Are Referring Your Referral Connections To Your Friends or Loving One and as he/she complete their Signup on Tomestry and as their 1st order get delivered Successfully ,You both will get Rs.10 in Tomestry Wallet.</text>
                        <text>As much Your Connections get increased,accordingly you will get Rs.10 on each Successful Connection.</text>
                        <section id="updatePassword">
                            <Paper elevation={3} className={classes.update}>
                                <form noValidate className={classes.form}>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="password1"
                                        label="New Password"
                                        name="password1"
                                        type={showPassword ? "text" : "password"}
                                        autoComplete="current-password"
                                        onChange={handleInput}
                                        InputProps={{
                                            endAdornment: (
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => {
                                                        toggleShowPassword(!showPassword)
                                                    }}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            )
                                        }}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password2"
                                        label="Confirm"
                                        type={"password"}
                                        id="password2"
                                        onChange={handleInput}
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="secondary"
                                        disabled={password2 !== password1}
                                        className={classes.submit}
                                        onClick={handleSubmit}
                                    >
                                        Update Password
                                    </Button>
                                </form>
                            </Paper>
                        </section>
                    </div>
                </Container>
            </div>
        );
}






