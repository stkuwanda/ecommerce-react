import { takeLatest, put, call } from "redux-saga/effects";
import { ShopActionTypes } from "./shop.types";
import {
  collection,
  firestore,
  getDocs,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { fetchCollectionsFailure, fetchCollectionsSuccess } from "./shop.actions";

export function* fetchCollectionsAsync() {
  if (process.env.NODE_ENV === "development") {
    yield console.log(
      "line 6, shop.sagas.js, fetchCollectionsAsyncAsync, I've been triggered!"
    );
  }

  try {
    const collectionRef = collection(firestore, "collections");
    const snapShot = yield getDocs(collectionRef);
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapShot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "line 29, shop.sagas.js, fetchCollectionsAsync, Error Retrieving QuerySnapshot:",
        err.message
      );
    }
    yield put(fetchCollectionsFailure(err.message));
    alert("An unexpected error occurred!");
  }
}

export function* fetchCollectionsStart() {
  // takeLatest starts a new fetchCollectionsAsync task whenever it picks up a FETCH_COLLECTIONS_START action
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
