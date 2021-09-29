import {
  getDocs,
  collection,
  firestore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { ShopActionTypes } from "./shop.types";

// Pure actions

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START,
});

export const fetchCollectionsSuccess = (collectionsMap) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap,
});

export const fetchCollectionsFailure = (errMessage) => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errMessage,
});

// Utility functions

export const fetchCollectionsStartAsync = () => {
  return (dispatch) => {
    const collectionRef = collection(firestore, "collections");

    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 33, shop.actions.js, fetchCollectionsStartAsync, CollectionRef Object:",
        collectionRef
      );
    }

    dispatch(fetchCollectionsStart());

    // Get shop data from firestore
    getDocs(collectionRef)
      .then((snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);

        dispatch(fetchCollectionsSuccess(collectionsMap));

        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 49, shop.actions.js, getDocs.then, Collections Map Object:",
            collectionsMap
          );
        }
      })
      .catch((err) => {
        dispatch(fetchCollectionsFailure(err.message))

        alert("An unexpected error occurred!");

        if (process.env.NODE_ENV === "development") {
          console.log(
            "line 61, shop.actions.js, getDocs.then, Error Retrieving QuerySnapshot:",
            err.message
          );
        }
      });
  };
};
