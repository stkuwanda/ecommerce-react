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
import { updateCollections } from "../../redux/shop/shop.actions";
import { connect } from "react-redux";

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = collection(firestore, "collections");

    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 20, shop.component.jsx, componentDidMount, CollectionRef Object:",
        collectionRef
      );
    }

    onSnapshot(collectionRef, {
      next: async (snapshot) => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 29, shop.component.jsx, onSnapshot, QuerySnapshot Object:",
            snapshot
          );
        }
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 36, shop.component.jsx, onSnapshot, Collections Map Object:",
            collectionsMap
          );
        }
      },
      error: (err) => {
        alert("An unexpected error occurred!");
        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 45, shop.component.jsx, onSnapshot, Error Retrieving QuerySnapshot:",
            err.message
          );
        }
      },
    });
  }

  render() {
    const { match } = this.props;

    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 58, shop.component.jsx, ShopPage, Match object:",
        match
      );
    }
    return (
      <div className='shop-page'>
        <Route exact path={match.path} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) => dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
