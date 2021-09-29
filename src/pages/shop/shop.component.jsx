import React from "react";
import { Route } from "react-router-dom";
import {
  collection,
  firestore,
  onSnapshot,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import withSpinner from "../../components/with-spinner/with-spinner.component";
import { updateCollections } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";

// Creating Wrapped Components
const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionPageWithSpinner = withSpinner(CollectionPage);

class ShopPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: true };
  }

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, "collections");

    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 23, shop.component.jsx, componentDidMount, CollectionRef Object:",
        collectionRef
      );
    }

    onSnapshot(collectionRef, {
      next: (snapshot) => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 32, shop.component.jsx, onSnapshot, QuerySnapshot Object:",
            snapshot
          );
        }
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });

        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 41, shop.component.jsx, onSnapshot, Collections Map Object:",
            collectionsMap
          );
        }
      },
      error: (err) => {
        alert("An unexpected error occurred!");
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 50, shop.component.jsx, onSnapshot, Error Retrieving QuerySnapshot:",
            err.message
          );
        }
      },
    });
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;

    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 63, shop.component.jsx, ShopPage, Match object:",
        match
      );
    }

    return (
      <div className='shop-page'>
        <Route
          exact
          path={match.path}
          render={(props) => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
