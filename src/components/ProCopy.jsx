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





export default (props) => {

    const ctx = useContext(GlobalContext);
    const [profile, setProfile] = useState({});
    

    useEffect(() => {
        Axios.get(`${BASE_URL}/profile/`, { headers: { Authorization: ctx.state.accessToken } }).then(
            response => {
                setProfile(response.data);
            }
        )
        });

    
    if (!ctx.state.accessToken || ctx.state.accessToken == "Token null" || ctx.state.accessToken == "Token undefined") {
        return <div style={{textAlign:"center"}}><strong style={{textAlign:"center"}}> Welcome User, Plz Login your ID. </strong></div>                        
    } else

        return (
        <div style={{textAlign:"center"}}><strong style={{textAlign:"center"}}> Welcome,<strong style={{color:"rgb(126,14,153)"}}>{" "+profile.first_name}</strong></strong></div>                        
        );
}