import React, {useEffect, useState} from "react"
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    makeStyles,
    Typography,
    withStyles
} from "@material-ui/core";
import {BASE_URL} from "../constant";
import Axios from "axios"
import {BASE_URL_IMAGE} from "../constant"
import {Rating as ORating} from "@material-ui/lab"
import {useHistory} from "react-router-dom"
import theme from "../theme";
import Loader from "./Loader";


export const Rating = withStyles({
    iconFilled: {
        color: theme.palette.primary.main
    }
})(ORating);

const merchandise_list = [
    {
        id: 1,
        name: "Step In Cafe",
        additional_detail: "Popular"
    },
    {
        id: 4,
        name: "Step In Cafe",
        additional_detail: "Popular"
    },
    {
        id: 5,
        name: "Spicy Hub",
        additional_detail: "New"
    },
    {
        id: 6,
        name: "Famous Dum Biryani",
        additional_detail: "Promoted"
    },
    {
        id: 7,
        name: "BBC",
        additional_detail: "Famous"
    },
    {
        id: 1,
        name: "Step In Cafe",
        additional_detail: "Popular"
    }
];
const useStyles = makeStyles(theme => ({

    card: {
        display: 'flex',
        justifyContent:"flex-start",
        height:"14vw"
    },
    "@media only screen and (max-width: 600px)" :{
        card:{
            height:"auto"
        }
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:"space-around"
    },
    content: {
    },

    controls: {
        display: 'flex',
        alignItems: 'center',
        justifyContent:"space-around",
    },
    cover: {
        width: 151,
        height: 151,
        padding:theme.spacing(6)
    },
    rating:{
    }

}));


export default (props) => {
    const history = useHistory();
    const [merchandises, setMerchandises] = useState([]);
    useEffect(() => {
        Axios.get(`${BASE_URL}/merchandise/?filter=popular`).then(response => {
                setMerchandises(response.data.filter(m => m.is_open == true))
            }
        ).catch(error => {
            console.log("Merchandise  loading failed.");
            console.log({error})
        })
    }, []);
    const classes = useStyles();


    if(merchandises.length ===0)
        return <Loader height={"10"} />
    else return (
           <React.Fragment>
             {merchandises.map(merchandise => (
               <Grid item key={merchandise.id} xs={12} sm={6} md={4}>
                 <Card
                   className={classes.card}
                   elevation={1}
                   square
                   onClick={() => {
                     history.push(`/menu/${merchandise.id}`);
                   }}
                 >
                   <CardMedia
                     className={classes.cover}
                     image={
                       merchandise.featured_photo ||
                       `${BASE_URL_IMAGE}/media/default_image.jpeg`
                     }
                     title="Merchandise photo"
                   />
                   <div className={classes.details}>
                     <CardContent className={classes.content}>
                       <Typography
                         variant={"subtitle2"}
                         style={{ fontWeight: "bold", letterSpacing: ".8" }}
                       >
                         {merchandise.name}
                       </Typography>
                       <Typography variant="subtitle1" color="textSecondary">
                         <small>{"Veg & Non-veg"}</small> <br />
                         <small>{"50% discount"}</small> <br />
                         <small>{"Rs. 150 for two"}</small> <br />
                       </Typography>
                     </CardContent>
                     <div className={classes.controls} style={{ padding: 8 }}>
                       <Rating
                         read_only
                         value={+merchandise.rating || 1}
                         precision={0.5}
                         size={"small"}
                         className={classes.rating}
                       />
                       <small> </small>
                     </div>
                   </div>
                 </Card>
               </Grid>
             ))}
           </React.Fragment>
         );
};
