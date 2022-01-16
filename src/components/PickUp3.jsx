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

const merchandise_list = [
  {
    id: 1,
    name: "Step In Cafe",
    additional_detail: "Popular",
  },
  {
    id: 4,
    name: "Step In Cafe",
    additional_detail: "Popular",
  },
  {
    id: 5,
    name: "Spicy Hub",
    additional_detail: "New",
  },
  {
    id: 6,
    name: "Famous Dum Biryani",
    additional_detail: "Promoted",
  },
  {
    id: 7,
    name: "BBC",
    additional_detail: "Famous",
  },
  {
    id: 1,
    name: "Step In Cafe",
    additional_detail: "Popular",
  },
];
const useStyles = makeStyles((theme) => ({
  card: {},
  details: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    display: "flex",
    justifyContent: "space-between",
  },
  additional_detail: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
  },
  cover: {
    maxHeight: 300,
    minHeight: 200,
  },
}));

export default (props) => {
  const history = useHistory();
  const [merchandises, setMerchandises] = useState([]);
  useEffect(() => {
    Axios.get(`${BASE_URL}/merchandise/`)
      .then((response) => {
        setMerchandises(response.data.filter((m) => m.is_open == true && m.id === 4 ));
      })
      .catch((error) => {
        console.log("Merchandise  loading failed.");
        console.log({ error });
      });
  }, []);
  const classes = useStyles();

  if (merchandises.length === 0) return <Loader height={"10"} />;
  else
    return (
      <React.Fragment>
        {merchandises.map((merchandise) => (
          <Grid item key={merchandise.id} xs={12} sm={6} md={4}>
            <Card
              className={classes.card}
              elevation={3}
              onClick={() => {
                history.push(`/menu/${merchandise.id}`);
              }}
            >
              <CardMedia
                className={classes.cover}
                image={
                  merchandise.featured_photo ||
                  `{BASE_URL_IMAGE}/media/default_image.jpeg`
                }
                title="Merchandise photo"
              />
              <div className={classes.details}>
                <div className={classes.first}>
                  <strong> {merchandise.name}</strong> <br />
                  <small
                  
                  style={{
                    color:"green",
                    // fontWeight:""
    
                  }}
                  
                  > {merchandise.location} </small>
                </div>
                <div>
                  <Rating
                    read_only
                    value={merchandise.rating || 1}
                    precision={0.5}
                    size={"small"}
                  />
                  <br />
                  <small>{merchandise.type}</small>
                </div>
              </div>
              <div
              style={{
                color:"blue",
                fontWeight:"bold"

              }}
                
                className={classes.additional_detail}>
                <small>{merchandise.additional_detail.slice(0, 50)} </small>
              </div>
            </Card>
          </Grid>
        ))}
      </React.Fragment>
    );
};