import { takeLatest, put, call, all } from "redux-saga/effects";
import { ShopActionTypes } from "./shop.types";
import {
  collection,
  firestore,
  getDocs,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from "./shop.actions";

function* fetchCollectionsSaga() {
  if (process.env.NODE_ENV === "development") {
    yield console.log(
      "shop.sagas.js, fetchCollectionsSaga, I've been triggered!"
    );
  }

  try {
    const collectionRef = collection(firestore, "collections");
    const snapShot = yield call(getDocs, collectionRef);
    const collectionsMap = yield call(
      convertCollectionsSnapshotToMap,
      snapShot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (err) {
    yield put(fetchCollectionsFailure(err.message));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "shop.sagas.js, fetchCollectionsSaga, Error Retrieving QuerySnapshot:",
        err.message
      );
    }
    alert("An unexpected error occurred!");
  }
}

function* fetchCollectionsStartSaga() {
  // takeLatest starts a new fetchCollectionsAsync task whenever it picks up a FETCH_COLLECTIONS_START action
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsSaga
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStartSaga),]);
}
