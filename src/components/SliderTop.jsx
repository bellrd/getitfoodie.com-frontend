import {
    Button, Paper,
    Typography
  } from "@material-ui/core";
  import { makeStyles } from "@material-ui/core/styles";
  import React from "react";
  import Carousel from "react-multi-carousel";
  import "react-multi-carousel/lib/styles.css";
  import { useHistory } from "react-router-dom";
  
  import imageUrl1 from "../assets/SliderTop.jpg";
  import imageUrl5 from "../assets/grocery.png";
  import imageUrl3 from "../assets/leg.jpg";
  // target_url: "https://getitfoodie.com/menu/17";
  import imageUrl2 from "../assets/paneer.jpg";
  import imageUrl4 from "../assets/vegetables.jpg";
  import imageUrl6 from "../assets/refer2.jpg";
  // import imageUrl7 from "../assets/offer.jpg";
  // import imageUrl8 from "../assets/offer.jpg";
  
  
  
  const demoOffer = [
    {
      // title: "@Shop Price",
      // description: "Best Chinese Food",
      // action: "some url",
      imageUrl: imageUrl1,
      //target_url: "/menu/4",
    },
    {
      // title: "@Shop Price",
      // description: "Best Chinese Food",
      // action: "some url",
      imageUrl: imageUrl1,
      //target_url: "/menu/4",
    },
    {
      // title: "@Shop Price",
      // description: "Best Chinese Food",
      // action: "some url",
      imageUrl: imageUrl1,
      //target_url: "/menu/4",
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
      height: 105,
      padding: theme.spacing(4),
      marginRight: theme.spacing(0),
      marginBottom: 5,
      marginLeft: theme.spacing(0),
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
        infinite={false}
        autoPlay={true}
        autoPlaySpeed={0}
        keyBoardControl={true}
        // customTransition="all .5s ease-in-out"
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
  