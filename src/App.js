import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component";
import ContactsPage from "./pages/contacts/contacts.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  // The constructor has been commented out since it's not being used to set state or props
  // constructor(props) {
  //   super(props);
  // }

  render() {
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
              this.props.currentUser ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(App);
