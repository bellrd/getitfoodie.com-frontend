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














const useStyles = makeStyles((theme) => ({
  card: {
    width:85,
    height:60,    //70
    marginLeft:1,
    marginRight:-22,
    marginLeft:9,
    marginTop:4,
    // align:"center",
    // textAlign: "center",
    // alignItem: "center",
    // display: "flex",
    // justifyContent: "auto",
    // marginTop: theme.spacing(2),
    marginBottom: theme.spacing(-3),
    // paddingLeft: theme.spacing(4),
    // paddingRight: theme.spacing(4),
    



  },
  // details: {
  //   marginTop: theme.spacing(2),
  //   marginBottom: theme.spacing(2),
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4),
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
  // additional_detail: {
  //   paddingLeft: theme.spacing(4),
  //   paddingRight: theme.spacing(4),
  //   paddingTop: theme.spacing(0.5),
  //   paddingBottom: theme.spacing(1),
  // },
  // cover: {
  //   maxHeight: 80,
  //   minHeight: 60,
  // },
}));

export default (props) => {
  const history = useHistory();
  const [merchandises, setMerchandises] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/merchandise/`)
      .then((response) => {
        setMerchandises(response.data.filter((m) => m.is_open == true && m.location === "Home Delivery." ));
      })
      .catch((error) => {
        console.log("Merchandise  loading failed.");
        console.log({ error });
      });
  }, []);
  const classes = useStyles();

  if (merchandises.length === 0) return  <h6 ></h6>
  if (merchandises.length  === 1)  return <h6 ></h6>
  if (merchandises.length  === 2)  return <h6 ></h6>
  
  
  
  
  else
    return (
      <React.Fragment  style={{color:"red"}}>
        {merchandises.map((merchandise) => (
          <Grid item key={merchandise.id} xs={0} sm={0} md={0}>
            <Card style={{textAlign:"center"}}
              className={classes.card}
              elevation={3}
              onClick={() => {
                history.push(`/menu/${merchandise.id}`);
              }}
            >
              <CardMedia  style={{height:60, width:90}}    // image height width adjustment
                className={classes.cover}
                image={
                  merchandise.featured_photo ||
                  `{BASE_URL_IMAGE}/media/default_image.jpeg`
                }
                title="Merchandise photo"
              />
              {/* <div className={classes.details}> */}
                {/* <div className={classes.first} style={{color:"red", fontSize:"1.5vh", textAlign:"center" }} >
                  <strong > {merchandise.name}</strong> <br /> */}
                  {/* <small
                  
                  style={{
                    color:"green",
                    // fontWeight:""
    
                  }}
                  
                  > {merchandise.location} </small> */}
                {/* </div> */}
                {/* <div>
                  <Rating
                    read_only
                    value={merchandise.rating || 1}
                    precision={0.5}
                    size={"small"}
                  />
                  <br />
                  <small>{merchandise.type}</small>
                </div> */}
              {/* </div> */}
              {/* <div
              style={{
                color:"blue",
                fontWeight:"bold"

              }}
                
                className={classes.additional_detail}>
                <small>{merchandise.additional_detail.slice(0, 50)} </small>
              </div> */}
            </Card>
          </Grid>
        ))}
      </React.Fragment>
    );
};