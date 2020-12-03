import React from "react";
import { Link } from "react-router-dom";
import {
  Paper,
  Box,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import imageUrl1 from "../assets/burger.jpg";
import imageUrl2 from "../assets/paneer.jpg";
import imageUrl3 from "../assets/leg.jpg";
import imageUrl4 from "../assets/vegetables.jpg";
import imageUrl5 from "../assets/grocery.png";


const demoOffer = [
  {
    // title: "@Shop Price",
    // description: "Best Chinese Food",
    // action: "some url",
    imageUrl: imageUrl1,
  },
  {
    // title: "Pure & Fresh Foods",
    // description: "Family Food",
    // action: "click me",
    imageUrl: imageUrl2,
    //imageUrl: "https://source.unsplash.com/random",
  },
  {
    // title: "Non-Vegetarian",
    // description: "Fresh Non-Veg",
    // action: "press me",
    imageUrl: imageUrl3,
  },
  {
    // title: "Fresh Vegetables",
    // description: "Care Of Health",
    // action: "Enjoy",
    imageUrl: imageUrl4,
  },
  {
    // title: "Grocery",
    // description: "Your Daily Essential",
    // action: "Best One",
    imageUrl: imageUrl5,
  },
];
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
const useStyles = makeStyles((theme) => ({
  offercard: {
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    textAlign: "center",
    alignItem: "center",
    height: 260,
    padding: theme.spacing(4),
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1500}
      keyBoardControl={true}
      customTransition="all .5s ease-in-out"
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      arrows={false}
      itemClass="carousel-item-padding-40-px"
    >
      {demoOffer.map((item, index) => (
        <Paper
          key={index}
          className={classes.offercard}
          elevation={3}
          style={{
            background: `linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(${item.imageUrl})`,
            // background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${item.imageUrl})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Typography variant={"h6"}> {item.title}</Typography>
          <div>
            <Typography variant={"subtitle1"}>
              {" "}
              <small>{item.description} </small>
            </Typography>
            <Button variant={"text"} size={"small"} color={"primary"}>
              {" "}
              {item.action}
            </Button>
          </div>
        </Paper>
      ))}
    </Carousel>
  );
};
