import { takeEvery } from "redux-saga/effects";
import { ShopActionTypes } from "./shop.types";

export function* fetchCollectionsAsync() {
  if (process.env.NODE_ENV === "development") {
    yield console.log(
      "line 6, shop.sagas.js, fetchCollectionsAsyncAsync, I am fired!"
    );
  }
}

export function* fetchCollectionsStart() {
  // takeEvery starts a new fetchCollectionsAsync task whenever it picks up a FETCH_COLLECTIONS_START action
  yield takeEvery(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsAsync
  );
}
