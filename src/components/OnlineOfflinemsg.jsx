import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import { BASE_URL } from "../constant";
import { BASE_URL_IMAGE } from "../constant";
import Axios from "axios";
import { Rating as ORating } from "@material-ui/lab";
import { useHistory } from "react-router-dom";
import theme from "../theme";
import Loader from "./Loader";











export const Rating = withStyles({
  iconFilled: {
    color: theme.palette.primary.main,
  },
})(ORating);


const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: 50,




  },
  details: {
    // textAlign: "center",
    // marginTop: theme.spacing(2),
    // marginBottom: theme.spacing(2),
    // paddingLeft: theme.spacing(4),
    // paddingRight: theme.spacing(4),
    // display: "flex",
    // justifyContent: "space-between",
  // },
  // additional_detail: {
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4),
  //   paddingTop: theme.spacing(99),
  //   paddingBottom: theme.spacing(1),
  },
  // cover: {
  //   maxHeight: 0,
  //   minHeight: 200,
  // },
}));

export default (props) => {
  const history = useHistory();
  const [merchandises, setMerchandises] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/merchandise/`)
      .then((response) => {
        setMerchandises(response.data.filter((m) => m.is_open == true ));
        
      })
      .catch((error) => {
        console.log("Merchandise  loading failed.");
        console.log({ error });
      });
  }, []);
  const classes = useStyles();

  // merchandises.length = ()
  
  if (merchandises.length  === 0)  return <h3 style={{textAlign:"center", marginTop:"0px", marginBottom:"0px"}}>Website is <strong  style={{color:"red", fontSize:"3vh" }}> Offline </strong> now.</h3>
  if (merchandises.length  === 1)  return <h3 style={{textAlign:"center", marginTop:"0px", marginBottom:"0px"}}>Website is <strong  style={{color:"red", fontSize:"3vh" }}> Offline </strong> now.</h3>
  if (merchandises.length  === 2)  return <h3 style={{textAlign:"center", marginTop:"0px", marginBottom:"0px"}}>Website is <strong  style={{color:"red", fontSize:"3vh" }}> Offline </strong> now.</h3>
  // if (merchandises.length  ===1)  return <h3 style={{textAlign:"center"}}>Website is <strong  style={{color:"red", fontSize:"3vh" }}> Offline </strong> now.</h3>

  else
    return (
<h3 style={{textAlign:"center", marginTop:"0px", marginBottom:"0px"}}>Website is <strong  style={{color:"green", fontSize:"3vh" }}> Online </strong> now.</h3>
    );
};
