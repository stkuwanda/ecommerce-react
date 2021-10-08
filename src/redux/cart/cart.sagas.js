import { takeLatest, put, all, call } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

function* clearCartOnSignOutSaga(){
    yield put(clearCart());
}

function* onSignOutSuccessSaga(){
    yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOutSaga);
}

export function* cartSagas(){
    yield all([call(onSignOutSuccessSaga)]);
}