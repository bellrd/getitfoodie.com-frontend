import React from "react";
import {Link} from "react-router-dom"
import {Paper, Box, Button, Typography, Card, CardMedia, CardContent, CardActionArea} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const demoOffer = [
    {
        title: "Offer 1",
        description: "very good offer it is",
        action: "some url"
    },
    {
        title: "Offer 2",
        description: "you can't refuse",
        action: "click me"
    },
    {
        title: "Offer 3",
        description: "I wish i could",
        action: "press me"
    },
    {
        title: "offer 4",
        description: "Here are you",
        action: "Enjoy"
    },
    {
        title: "Offer 5",
        description: "Wait for me",
    }
];
const responsive = {
    desktop: {
        breakpoint: {max: 3000, min: 1024},
        items: 3,
        slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
        breakpoint: {max: 1024, min: 464},
        items: 2,
        slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
        breakpoint: {max: 464, min: 0},
        items: 1,
        slidesToSlide: 1, // optional, default to 1.
    },
};
const useStyles = makeStyles(theme => ({
    offercard:{
        color:"#fff",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        textAlign:"center",
        alignItem:"center",
        height:150,
        padding:theme.spacing(4),
        marginRight:theme.spacing(1),
        marginLeft:theme.spacing(1)
    }
}));


export default (props) => {
    const classes = useStyles();
    return (
        <Carousel
            swipeable={true}
            draggable={false}
            responsive={responsive}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5s ease-in-out"
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {
                demoOffer.map((item,index) => (
                    <Paper key={index} className={classes.offercard} elevation={2} style={{background:"linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(https://source.unsplash.com/random)"}}>
                        <Typography variant={"h6"}> {item.title}</Typography>
                        <div>
                            <Typography variant={"subtitle1"} > <small>{item.description} </small></Typography>
                            <Button variant={"text"} size={"small"} color={"primary"}> {item.action}</Button>
                        </div>
                    </Paper>
                ))
            }
        </Carousel>
    )
}
