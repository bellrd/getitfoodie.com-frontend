import React from "react";
import AppBar from "../components/AppBar";
import {
  Box, Container, CssBaseline, ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Hidden,
  List,
  ListItem,
  ListItemText,
  DialogContent,
  ListSubheader,
  Paper,
  IconButton,
  Divider,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slider from "../components/Slider";
import SliderTop from "../components/SliderTop";
import Footer from "../components/Footer";
import MerchandiseCardList from "../components/MerchandiseCardList";
import QuickLinks from "../components/QuickLinks";
import FoodCollection from "../components/FoodCollection";
import OnlineOfflinemsg from "../components/OnlineOfflinemsg";
import SpicyChi from "../components/SpicyChi";
import LaunchingSoon from "../components/LaunchingSoon";
import PopularMerchandiseList from "../components/PopularMerchandiseList";
import hero_background from "../assets/hero_background.jpg";
import SelfPick from "../components/SelfPick";
import ProCopy from "../components/ProCopy";
import NoticePopup from "../components/NoticePopup";
// import CancelOrder from "../components/CancelOrder";
import AdPick from "../components/AdPick";
import CancelOrder from "../components/CancelOrder";
import BlinkText from "../components/BlinkText";
import BlinkSp from "../components/BlinkSp";
import BlinkNotice from "../components/BlinkNotice";
// import WelcomeText from "../components/WelcomeText";
import { ExpandMore, KeyboardBackspaceRounded as Back } from "@material-ui/icons";






const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
    marginTop: theme.spacing(0.1),
    background: `linear-gradient( rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.3) ), url(${hero_background})`,
    backgroundPosition: "center",
    position: "relative",
    backgroundSize: "cover",
    maxHeight: 300
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  vendor: {
    padding: theme.spacing(4, 1, 8, 1)
  },
  welcome: {
    fontWeight: "bolder",
    fontSize: "2rem",
    color: "white"
  },
  brand: {
    color: "white",
    fontWeight: "bolder"
  },
  moticeTitle: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bolder",
    textDecoration: "underline",
    color: theme.palette.primary.main
  },
  timeTitle: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bolder",
    textDecoration: "underline",
    color: theme.palette.primary.main
  },
  vendorTitle: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bolder",
    textDecoration: "underline",
    color: theme.palette.primary.main
  },
  noticeTitle: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    fontWeight: "bolder",
    // textDecoration: "underline",
    color: theme.palette.primary.main
  }
}));

export default props => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar />
      {/* Hero content */}
      {/* <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            <span className={classes.brand}>Get-it</span>
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            paragraph
            style={{ color: "#fff" }}
          >
          GetIt is a low profit food and delivery services company active near BBD university. It has ties with 
          various local shop and restaurents and delivers their food and items to its customer. 
          </Typography>
        </Container>
      </div> */}
      {/* end --hero content */}

      <Container maxWidth={"xl"}>
        <CssBaseline />


        {/* editing start */}

        {/* <Typography 
        variant={"h6"}
        component="h3"
        padding="9px"
        // variant="h2"
        align="center"
        // backgroundColor="textPrimary"
        color={"#61DBFB"}
        // color="textPrimary"
        // gutterBottom

        className={classes.noticeTitle}>
          {""}
          Services Available By 11:00 A.M To 9:30 P.M
        </Typography> */}





        {/* editing end */}



        <Typography variant={"h6"} className={classes.vendorTitle}>
          {""}
          .{" "}
          {/* Click Me Below On Slider{" "} */}

        </Typography>
        <Box mt={1}>
          <CssBaseline />
          <SliderTop />
          <ProCopy />
          <OnlineOfflinemsg />
          <Slider />
          
        </Box>
      </Container>


      <Container maxWidth={"lg"} style={{ paddingBottom: "9px" }} >
        {/* <Typography variant={"h5"} align={"center"} color={"#0000"} className={classes.vendorTitle}>
          {" "}
          Welcome to Tomestry{" "}
        </Typography> */}
        {/* <Typography variant={"h6"} align={"center"} color={"#0000"} className={classes.vendorTitle}>
          {" "}
          Hello Guest{" "}
        </Typography> */}
        {/* <WelcomeText/> */}
        <Typography body={"h6"} align={"center"} style={{ color: "blue" }} className={classes.noticeTitle}>
          {/* {" "}
          <strong>You are Most Welcome in Tomestry.</strong> */}
          
          {/* <BlinkText /> */}
          <strong>Tomestry Services Available from 11:00 a.m To 9:30 p.m</strong>
          {" "}
        </Typography>
        






        {/*<Typography body={"h6"} align={"center"} style={{color:"red"}} className={classes.timeTitle}>
          {" "}
          Services Available From 11:00 A.M To 9:30 P.M{" "}
        </Typography>*/}
        



        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} style={{ backgroundColor: "orange" }}>
            <Typography style={{ color: "Black", fontWeight: "bold" }} >Home Delivery</Typography>
          </ExpansionPanelSummary>



          {/* Merchant Card Code Start */}

          <ExpansionPanelDetails>
            <Grid container spacing={4}>
              <MerchandiseCardList />
            </Grid>
          </ExpansionPanelDetails>


          {/* merchant Card Code End */}
        </ExpansionPanel>

      </Container>








      <Container maxWidth={"lg"}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMore />} style={{ backgroundColor: "rgb(189, 130, 150)", fontWeight: "bold" }}>
            <Typography style={{ fontWeight: "bold" }}><BlinkSp /></Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails style={{ marginLeft: "0px" }}>
            <Grid container spacing={4}>
              {/* <AdPick />
              <FoodCollection />
          <SpicyChi />
          <LaunchingSoon /> */}
          <SelfPick />
            </Grid>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Container>








      <Container maxWidth={"xl"}>
        <CssBaseline />
        <Typography variant={"h6"} className={classes.vendorTitle}>
          {" "}
          Other services
        </Typography>
        <Box mt={2}>
          <CssBaseline />
          <Slider />
        </Box>
      </Container>

      {/*
            <Container maxWidth={"md"}>
                <CssBaseline/>
                <Typography variant={"h6"} className={classes.vendorTitle} align={"center"}> Quick Links</Typography>
                <Grid container spacing={2} className={classes.ql}>
                    <QuickLinks/>
                </Grid>
            </Container>
            */}
      {/* 
            <Container maxWidth={"md"} style={{
                padding: "8px",
                color: "#fff",
                marginTop: "60px",
            }}>
                    <Typography variant={"h6"} align={"center"}> Quick Links </Typography>
                    <QuickLinks/>
            </Container> */}

      <Container maxWidth={"md"}>
        <CssBaseline />
        <Typography variant={"h6"} className={classes.vendorTitle} align={"center"}>
          Our Services
        </Typography>

        <Grid
          container
          spacing={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            marginTop: "1rem",
            marginBottom: "2rem"
          }}
          alignItems="center"
          justify="center"
        >
          <QuickLinks />
        </Grid>
        <BlinkNotice />
        <CancelOrder />
      </Container>
      <Footer />
      
      
      <NoticePopup />
      
    </React.Fragment>









  );


  // <Popup trigger={<button>Trigger</button>} position="top left">
  //   {close => (
  //     <div>
  //       Content here
  //       <a className="close" onClick={close}>
  //         &times;
  //       </a>
  //     </div>
  //   )}
  // </Popup>
};

/* <Popup trigger={<button>Trigger</button>} position="top left">
    {close => (
      <div>
        Content here
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup> */


