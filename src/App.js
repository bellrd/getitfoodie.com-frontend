import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { GlobalContextProvider } from "./GlobalContext";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import VerifyPage from "./pages/VerifyPage";
import EditAddressPage from "./pages/EditAddressPage";
import ChooseAddress from "./pages/ChooseAddress";
import Error404Page from "./pages/Error404Page";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import LogoutPage from "./pages/LogoutPage";
import PayOnline from "./pages/PayOnline";
import SuccessPage from "./pages/SuccessPage";
import ErrorPage from "./pages/ErrorPage";
import ProfilePage from "./pages/ProfilePage";
import PastOrderPage from "./pages/PastOrderPage";
import firebase from "./pages/firebase";
import StaffProfile from "./pages/StaffProfile";

const App = (props) => {
  return (
    <GlobalContextProvider>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/menu/:merchandise_id" exact component={MenuPage} />
              <Route path={"/cart"} exact component={CartPage} />
              <Route path={"/login"} exact component={LoginPage} />
              <Route path={"/register"} exact component={RegisterPage} />
              <Route
                path={"/forgotPassword"}
                exact
                component={ForgetPasswordPage}
              />
              <Route path={"/verify"} exact component={VerifyPage} />
              <Route path={"/chooseAddress"} exact component={ChooseAddress} />
              <Route path={"/editAddress"} exact component={EditAddressPage} />
              <Route path={"/profile"} exact component={ProfilePage} />
              <Route
                path={"/orderHistory"}
                exact
                component={OrderHistoryPage}
              />
              <Route path={"/pastOrder"} exact component={PastOrderPage} />
              <Route path={"/checkout"} exact component={OrderSummaryPage} />
              <Route path={"/logout"} exact component={LogoutPage} />
              <Route path={"/pay-online"} exact component={PayOnline} />
              <Route path={"/success/:action?"} exact component={SuccessPage} />
              <Route path="/failed/:message?" component={ErrorPage} />
              {/* <Route path={"/staffprofile"} exact component={StaffProfile}/> */}
              <Route component={Error404Page} />
            </Switch>
          </div>
        </Router>
      </ThemeProvider>
    </GlobalContextProvider>
  );
};

export default App;
