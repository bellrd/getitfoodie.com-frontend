import { Paper, Grid, Typography, Avatar } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { BASE_URL_IMAGE } from "../constant";

const useStyles = makeStyles(theme => ({
  offercard: {
    margin: theme.spacing(2),
    minHeight: 130
  },
  quickLinkls:{
    display:"flex",
    flexDirection:"column",
    justifyItems:"center",
    justifyContent:"center",
    alignItems:"center"
  },
  medium: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  }
}));

const quickLinks = [
  {
    title: "Green vegetables & Fruits",
    target_url: "",
    image_url: `${BASE_URL_IMAGE}/media/veg_fruits.jpg`
  },
  {
    title: "Food & Grocery Items",
    target_url: "",
    image_url: `${BASE_URL_IMAGE}/media/grocery.jpg`
  },
  {
    title: "Affordable Tiffin Services",
    target_url: "",
    image_url: `${BASE_URL_IMAGE}/media/tiffin.jpg`
  }
];

export default () => {
  const classes = useStyles();
  //const [quickLinks, setQuickLinks] = React.useState(demoQuickLinks);
  return (
    <React.Fragment>
      {quickLinks.map((link, index) => (
        <Grid
          className={classes.quickLinkls}
          item
          xs={4}
          key={index}
          onClick={() => {
            window.location.href = link.target_url;
          }}
        >
          <Avatar src={link.image_url} alt={link.title} className={classes.medium} />

          <Typography variant={"subtitle2"} align={"center"}>
            <small>{link.title}</small>
          </Typography>
        </Grid>
      ))}
      </React.Fragment>
  );
};
