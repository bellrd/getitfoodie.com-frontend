import React, {useContext, useState} from "react";
import {Redirect,useHistory} from "react-router-dom"
import {Button, Container, CssBaseline, makeStyles, Paper, Typography} from "@material-ui/core";
import {KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Axios from "axios";
import {BASE_URL} from "../constant";
import {GlobalContext} from "../GlobalContext";

const useStyles = makeStyles(theme => ({
    title: {
        display: "flex",
        justifyContent: "space-between",
    },
    inline: {
        display: "inline"
    },
    root: {
        marginTop: theme.spacing(4)
    },
    paper: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(3)
    },
    saveButton: {
        marginTop: theme.spacing(4)
    }
}));


export default (props) => {
    const ctx = useContext(GlobalContext);

    const [address, setAddress] = useState(props.location.address || {
        id: "",
        pincode: "",
        detail: "",
        landmark: ""
    });
    const history = useHistory();
    const classes = useStyles();

    const edit = props.location.address != null;


    const handleInput = e => {
        setAddress({...address, [e.target.name]: e.target.value});
    };

    const handleSubmit = () => {
        if (!address.pincode.match(/^[\d]{6}$/)) {
            alert("Pincode is not valid")
            return; //required
        }

        if (address.landmark.length === 0) {
            alert("Landmark is required.\n Any popular place near you.")
            return; // don't mess
        }

        if (address.detail.length === 0) {
            alert("Complet detail is required.")
            return
        }

        if (address.detail.length === 0) {
            alert("Active Mobile No. Required")
            return
        }

        if (props.location.address == null) {
            Axios.post(`${BASE_URL}/address/`, address, {headers: {Authorization: ctx.state.accessToken}}).then(response => {
                    history.replace("/chooseAddress")
                }
            ).catch(error => {
                alert("Failed to save the address.")
                }
            )
        } else {
            Axios.put(`${BASE_URL}/address/${address.id}/`, address, {headers: {Authorization: ctx.state.accessToken}}).then(response => {
                    history.replace("/chooseAddress")
                }
            ).catch(error => {
                alert("Failed to save the address.")
                }
            )
        }
    };
    if (!ctx.state.accessToken || ctx.state.accessTokenc == "Token null"){
        return <Redirect to={{pathname:"/login", next:"/chooseAddress"}} />
    }else
        return (
            <React.Fragment>
                <Container maxWidth={"sm"} className={classes.root}>
                    <CssBaseline/>
                    <div className={classes.title}>
                        <Back fontSize={"large"} onClick={history.goBack}/>
                        <Typography variant={"h5"}
                                    align={"center"}><b> {props.location.address ? "Add address" : "Edit Address"}</b>
                        </Typography>
                    </div>
                    <Paper className={classes.paper} elevation={3}>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant={props.location.address ? "filled" : "standard"}
                                margin="normal"
                                required
                                fullWidth
                                id="pincode"
                                label="Pincode"
                                name="pincode"
                                type="text"
                                autoComplete="mobile"
                                onChange={handleInput}
                                defaultValue={edit ? props.location.address.pincode : ""}
                            />
                            <TextField
                                margin="normal"
                                required
                                variant={props.location.address ? "filled" : "standard"}
                                fullWidth
                                name="landmark"
                                label="Landmark And 1 Active Mobile No. "
                                defaultValue={edit ? props.location.address.landmark : ""}
                                id="landmark"
                                onChange={handleInput}
                            />
                            
                            <TextField
                                multiline
                                rows={2}
                                margin="normal"
                                required
                                variant={props.location.address ? "filled" : "standard"}
                                fullWidth
                                name="detail"
                                label="Full Detail"
                                defaultValue={edit ? props.location.address.detail : ""}
                                id="detail"
                                onChange={handleInput}
                            />
                            <Button
                                className={classes.saveButton}
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Save
                            </Button>
                        </form>
                    </Paper>
                </Container>
            </React.Fragment>
        )
}