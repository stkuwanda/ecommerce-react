import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import ContactsPage from "./pages/contacts/contacts.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { checkUserSession } from "./redux/user/user.actions";
import {
  selectCurrentUser,
  selectLoadingStatus,
} from "./redux/user/user.selectors";
import SignInAndSignUpContainer from "./pages/signin-and-signup-page/sign-in-and-sign-page.container";
import { compose } from "redux";
import withSpinner from "./components/with-spinner/with-spinner.component";

const App = ({ checkUserSession, currentUser }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/contacts' component={ContactsPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route
          path='/signin'
          render={() =>
            currentUser ? <Redirect to='/' /> : <SignInAndSignUpContainer />
          }
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectLoadingStatus,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSpinner
)(App);
