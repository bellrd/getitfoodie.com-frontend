import React from "react";
import AppBar from "../components/AppBar";
import { Box, Container, CssBaseline} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Slider from "../components/Slider";
import Footer from "../components/Footer";
import MerchandiseCardList from "../components/MerchandiseCardList";
import QuickLinks from "../components/QuickLinks";
import PopularMerchandiseList from "../components/PopularMerchandiseList";
import hero_background from "../assets/hero_background.jpg";
import NoticePopup from "../components/NoticePopup";
// import CancelOrder from "../components/CancelOrder";
import CancelOrder from "../components/CancelOrder";








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
          <Slider />
        </Box>
      </Container>
      

      <Container maxWidth={"lg"}>
        <Typography variant={"h5"} align={"center"} color={"#0000"} className={classes.vendorTitle}>
          {" "}
          Welcome to Tomestry{" "}
        </Typography>
        <Typography body={"h6"} align={"center"} style={{color:"blue"}} className={classes.noticeTitle}>
          {" "}
          'Hi Dear, Now Tomestry Has introduced Refer and Earn Feature, Now You can send your Referral Code to your friend and ask them to Sigup his Tomestry Account by using your Referral Code. As he attempt 1st Successful Order Delivered with Tomestry, You both will get Tomestry Wallet Cash Back Of 10 Rs.  Go to Your Profile And Click on Share Button to Reffer and Earn. {" "}
        </Typography>
        
        
        
        
        
        <Typography body={"h6"} align={"center"} style={{color:"red"}} className={classes.timeTitle}>
          {" "}
          Services Available From 11:00 A.M To 9:30 P.M{" "}
        </Typography>
        <CancelOrder/>
        
        <Grid container spacing={4}>
          <MerchandiseCardList />
        </Grid>
      </Container>
      {/* <Container maxWidth={"lg"}>
        <Typography variant={"h6"} className={classes.vendorTitle}>
          {" "}
          All Available Vendors{" "}
        </Typography>
        <Grid container spacing={4}>
          <PopularMerchandiseList />
        </Grid>
      </Container> */}

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
            marginTop:"1rem",
            marginBottom:"2rem"
          }}
          alignItems="center"
          justify="center"
        >
          <QuickLinks />
        </Grid>
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
  
  
  