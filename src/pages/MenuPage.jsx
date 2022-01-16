import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  CssBaseline,
  Dialog,
  Fab,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  DialogContent,
  ListSubheader,
  makeStyles,
  Paper,
  IconButton,
  Typography,
} from "@material-ui/core";
import AppBar from "../components/AppBar";
import { GlobalContext } from "../GlobalContext";
import { withStyles } from "@material-ui/core/styles";
import Footer from "../components/Footer";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../constant";
import Axios from "axios";
import ItemCardList from "../components/ItemCardList";
import {ExpandMore, KeyboardBackspaceRounded as Back} from "@material-ui/icons";
import Loader from "../components/Loader";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import { Rating } from "../components/MerchandiseCardList";
import SearchIcon from "@material-ui/icons/Search";
import { ExpandLessOutlined } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(6),
  },
  filterBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
  },
  offerBar: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: theme.spacing(-6),
    padding: theme.spacing(0),
  },

  main: {
    padding: theme.spacing(0),
    justifyContent: "space-between",
  },
  categoryroot: {
    padding: theme.spacing(2),
    position: "fixed",
    right: 20,
    top: 70,
    background: theme.palette.background.paper,
    zIndex: 0,
  },
  checkout: {
    marginTop: theme.spacing(2),
    width: 200,
    borderRadius: 0,
  },
  cart: {
    position: "fixed",
    right: 30,
    bottom: 20,
  },

  category: {
    marginBottom: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
    fontWeight: "bold",
  },
  itemgrid: {
    display: "flex",
    alignItems: "stretch",
    minHeight: "100%",
  },
  filterFab: {
    position: "fixed",
    left: 20,
    bottom: 20,
  },
  cartFab: {
    position: "fixed",
    right: 20,
    bottom: 20,
  },
}));

export default (props) => {
  const ctx = React.useContext(GlobalContext);
  const history = useHistory();
  const merchandise_id = props.match.params.merchandise_id;
  const [merchandise_name, setMerchandiseName] = useState("STEPIN_CAFE");
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [showFilterDialog, setShowFilterDialog] = useState(false);
  useEffect(() => {
    Axios.get(`${BASE_URL}/merchandise/${merchandise_id}/`)
      .then((response) => {
        setCategories(
          response.data.categories.filter((c) => c.is_available == true)
        );
        setMerchandiseName(response.data.name);
      })
      .catch((error) => {
        console.log({ error });
        alert("Failed to load Menu");
      });
  }, []);

  if (categories.length === 0) {
    return (
      <div>
        <Container maxWidth={"sm"}>
          <CssBaseline>
            <Grid
              container
              spacing={0}
              direction={"column"}
              alignItems={"center"}
              justify={"center"}
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <Loader />
              </Grid>
            </Grid>
          </CssBaseline>
        </Container>
      </div>
    );
  } else
    return (
      <div className={classes.root}>
        <AppBar orderStatus={false} />
        <Container maxWidth={"lg"}>
          <div className={classes.filterBar}>
            <Typography
              variant={"h6"}
              align={"left"}
              style={{ fontWeight: "bold" }}
            >
              <h3
              style={{
                color:"green",
                textAlign:"center"

              }}
              
              > {merchandise_name}</h3>
            </Typography>
            
            {/* <Hidden mdUp>
              <Rating value={4.5} precision={0.5} color={"primary"} small />
            </Hidden> */}
          </div>
          <div className={classes.offerBar}
          style={{
            textAlign:"center"
          }}
          >
          <h4
          style={{color:"blue",
          textAlign:"center"
        }}
          
          
          >Coupon is at Next Page on selected Vendors Only.</h4>
          </div>

          <Grid container spacing={3} className={classes.main}>
            <Grid item xs={12} md={9}>
              {categories.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  className={classes.category}
                >
                  <Grid item xs={12}>



                <ExpansionPanel>

                  <ExpansionPanelSummary expandIcon={<ExpandMore/>} style={{backgroundColor:"rgb(189, 177, 235)"}}>
                    <box>
                    <Typography variant={"subtitle1"} className={classes.title}>
                      {category.name}
                    </Typography>
                    </box>
                    </ExpansionPanelSummary>





                    
                    <ExpansionPanelDetails>
                    <Grid container spacing={2} className={classes.itemgrid}>
                      <ItemCardList
                        category_id={category.id}
                        merchandise_id={merchandise_id}
                      />
                    </Grid>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>  






                  </Grid>
                
                </section>
              ))}
            </Grid>
            <Hidden smDown>
              <Grid item xs={3}>
                <Paper className={classes.categoryroot} elevation={0} square>
                  <List
                    subheader={
                      <ListSubheader>
                        <b> Filter </b>{" "}
                      </ListSubheader>
                    }
                  >
                    {categories.map((category) => (
                      <ListItem
                        button
                        component={"a"}
                        key={category.id}
                        href={`#${category.id}`}
                        selected={category.id === selectedCategory}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <ListItemText> {category.name}</ListItemText>
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    className={classes.checkout}
                    size={"large"}
                    variant={"contained"}
                    color={"primary"}
                    component={Link}
                    to={"/cart"}
                  >
                    View Cart{" "}
                  </Button>
                </Paper>
              </Grid>
            </Hidden>
          </Grid>
          <Hidden mdUp>
            <Fab
              // variant={"extended"}
              color={"primary"}
              className={classes.filterFab}
              onClick={() => {
                setShowFilterDialog(true);
              }}
            >
              <SearchIcon />
            </Fab>
          </Hidden>

          <Fab
            variant={"extended"}
            color={"primary"}
            className={classes.cartFab}
            onClick={() => {
              history.push("/cart");
            }}
          >
            Proceed
          </Fab>
        </Container>
        {/* <Footer/> */}

        <Dialog
          fullWidth
          maxWidth={"lg"}
          aria-labelledby="simple-dialog-title"
          open={showFilterDialog}
          disableBackdropClick={true}
        >
          <DialogTitle
            onClose={() => {
              setShowFilterDialog(false);
            }}
          >
            Filter
          </DialogTitle>
          <DialogContent>
            <List>
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  button
                  component={"a"}
                  href={`#${category.id}`}
                  onClick={() => setShowFilterDialog(false)}
                >
                  <ListItemText>
                    {" "}
                    <small> {category.name} </small>
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
};
