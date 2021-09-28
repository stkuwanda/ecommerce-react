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
  addCollectionAndDocuments,
} from "./firebase/firebase.utils";
import ContactsPage from "./pages/contacts/contacts.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import { selectCurrentUser } from "./redux/user/user.selectors";
import { selectCollections } from "./redux/shop/shop.selectors";

class App extends React.Component {
  // The constructor has been commented out since it's not being used to set state or props
  // constructor(props) {
  //   super(props);
  // }

  unsubscribeFromAuth = null;
  unsubscribeFromDocRef = null;

  componentDidMount() {
    const { setCurrentUser, collectionsList } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = await createUserProfileDocument(user);
        this.unsubscribeFromDocRef = onSnapshot(docRef, {
          next: (snapshot) => {
            let user = { id: snapshot.id, ...snapshot.data() };
            setCurrentUser(user);
            if (process.env.NODE_ENV === "development") {
              console.log(
                "line 36, App.js, componentDidMount(), Current User state:",
                user
              );
            }
          },
        });
      }
      setCurrentUser(null);
      addCollectionAndDocuments("collections", collectionsList.map(({title, items}) => ({title, items})));
    });
  }

  componentWillUnmount() {
    if (process.env.NODE_ENV === "development") {
      console.log("Unsubscribing observers... ");
    }

    if (this.unsubscribeFromAuth) this.unsubscribeFromAuth();
    if (this.unsubscribeFromDocRef) this.unsubscribeFromDocRef();
  }

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
  collectionsList: selectCollections,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
