import {
  Button, Paper,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";

import imageUrl1 from "../assets/burger.jpg";
import imageUrl5 from "../assets/grocery.png";
import imageUrl3 from "../assets/leg.jpg";
// target_url: "https://getitfoodie.com/menu/17";
import imageUrl2 from "../assets/paneer.jpg";
import imageUrl4 from "../assets/vegetables.jpg";



const demoOffer = [
  {
    // title: "@Shop Price",
    // description: "Best Chinese Food",
    // action: "some url",
    imageUrl: imageUrl1,
    target_url: "/menu/4",
  },
  {
    // title: "Pure & Fresh Foods",
    // description: "Family Food",
    // action: "click me",O
    imageUrl: imageUrl2,
    //imageUrl: "https://source.unsplash.com/random",
    target_url: "/menu/2",
  },
  {
    // title: "Non-Vegetarian",
    // description: "Fresh Non-Veg",
    // action: "press me",
    imageUrl: imageUrl3,
    target_url: "/menu/1",
  },
  {
    // title: "Fresh Vegetables",
    // description: "Care Of Health",
    // action: "Enjoy",
    imageUrl: imageUrl4,
    target_url: "/menu/17",
  },
  {
    // title: "Grocery",
    // description: "Your Daily Essential",
    // action: "https://getitfoodie.com/menu/22",
    imageUrl: imageUrl5,
    target_url: "/menu/22",
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
  const history = useHistory();
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
          onClick={() => history.push(item.target_url)}
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
              <small>{item.description} </small>
            </Typography>
            <Button variant={"text"} size={"small"} color={"primary"}>
              {item.action}
            </Button>
          </div>
        </Paper>
      ))}
    </Carousel>
  );
};
