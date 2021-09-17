import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { setCurrentUser } from "./redux/user/user.actions";
import HomePage from "./pages/homepage/homepage.component";
import "./App.css";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/signin-and-signup-page/signin-and-signup-page.component";
import {
  auth,
  createUserProfileDocument,
  onSnapshot,
} from "./firebase/firebase.utils";
import ContactsPage from "./pages/contacts/contacts.component";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;
  unsubscribeFromDocRef = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = await createUserProfileDocument(user);
        this.unsubscribeFromDocRef = onSnapshot(docRef, {
          next: (snapshot) => {
            let user = { id: snapshot.id, ...snapshot.data() };
            setCurrentUser(user);
            console.log(
              "line 36, App.js, componentDidMount(), Current User state:",
              user
            );
          },
        });
      }
      setCurrentUser(null);
    });
  }

  componentWillUnmount() {
    console.log("Unsubscribing observers... ");
    this.unsubscribeFromAuth();
    this.unsubscribeFromDocRef();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/contacts' component={ContactsPage} />
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

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
