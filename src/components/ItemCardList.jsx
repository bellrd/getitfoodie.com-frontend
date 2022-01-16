import { Container, CssBaseline, Grid } from "@material-ui/core";
import React, { useEffect, useLayoutEffect } from "react";
import ItemCard from "./ItemCard";
import ItemNCard from "./ItemNcard";
import Axios from "axios";
import { BASE_URL } from "../constant";
import { CSSTransition } from "react-transition-group";
import Loader from "./Loader";
export default (props) => {
  const [items, setItems] = React.useState(null);
  const merchandise_id = props.merchandise_id;
  const category_id = props.category_id;
  useLayoutEffect(() => {
    Axios.get(`${BASE_URL}/categorywise-menu/${category_id}/`)
      .then((response) => {
        setItems(response.data.items.filter((i) => i.is_available == true));
      })
      .catch((error) => {
        console.log("category item loading failed");
      });
  }, []);
  if (items === null) {
    return <Loader type={"TailSpin"} />;
  } else
    return (
      <React.Fragment>
        {items
          .filter((item) => item.item_photo)
          .map((item) => (
            <Grid item key={item.id} xs={12} md={4}>
              <ItemCard
                item={item}
                category_id={category_id}
                merchandise_id={merchandise_id}
              />
            </Grid>
          ))}
        {items
          .filter((item) => !item.item_photo)
          .map((item) => (
            <Grid item key={item.id} xs={12} md={4}>
              <ItemNCard
                item={item}
                category_id={category_id}
                merchandise_id={merchandise_id}
              />
            </Grid>
          ))}
      </React.Fragment>
    );
};

//              <span>
//              Rs {item.prices[0].getit_mrp}
//              <del>{item.prices[0].regular_mrp}</del>
//              </span>