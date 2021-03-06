import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../GlobalContext";
import { Redirect } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

const LogoutPage = () => {
  const TIME_TO_REDIRECT = 1;
  const ctx = useContext(GlobalContext);
  const [timer, setTimer] = useState(TIME_TO_REDIRECT);

  useEffect(() => {
    ctx.dispatch({ type: "LOGOUT" });
  }, []);

  setInterval(() => {
    setTimer(timer - 1);
  }, 0);

  return timer ? (
    <Container maxWidth={"sm"}>
      <Typography variant={"h5"} align="center">
        Redirecting to HomePage...
      </Typography>
    </Container>
  ) : (
    <Redirect to="/" />
  );
};

export default LogoutPage;
