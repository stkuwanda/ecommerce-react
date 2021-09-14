import React from "react";
import { Route, Switch } from "react-router";
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;
  unsubscribeFromDocRef = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = await createUserProfileDocument(user);
        this.unsubscribeFromDocRef = onSnapshot(docRef, {
          next: (snapshot) => {
            this.setState({
              currentUser: { id: snapshot.id, ...snapshot.data() },
            });
          },
        });
      }
      this.setState({ currentUser: null });
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
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/contacts' component={ContactsPage} />
          <Route path='/signin' component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
