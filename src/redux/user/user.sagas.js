import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signInWithPopup,
  createUserProfileDocument,
  auth,
  googleProvider,
  getDoc,
  signInWithEmailAndPassword,
} from "../../firebase/firebase.utils";
import UserActionTypes from "./user.types";
import { signInFailure, signInSuccess } from "./user.actions";

function* setCurrentUserSaga(user) {
  try {
    const userDocRef = yield call(createUserProfileDocument, user);
    const userDocSnap = yield call(getDoc, userDocRef);
    yield put(signInSuccess({ id: userDocSnap.id, ...userDocSnap.data() }));
  } catch (err) {
    yield put(signInFailure(err));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "user.sagas.js, getUserDocSnapshot, Error signing in:",
        err.message
      );
    }
    alert("An error occurred while trying to sign in.");
  }
}

function* signInWithGoogleSaga() {
  try {
    const { user } = yield call(signInWithPopup, auth, googleProvider);

    if (process.env.NODE_ENV === "development") {
      console.log("user.sagas.js, signInWithPopup, Auth User Ref:", user);
    }

    yield call(setCurrentUserSaga, user);
  } catch (err) {
    yield put(signInFailure(err));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "user.sagas.js, signInWithPopup, Error signing in with Google:",
        err.message
      );
    }
    alert("An error occurred while trying to sign in with Google.");
  }
}

function* signInWithEmailSaga({ payload: { email, password } }) {
  try {
    const { user } = yield call(
      signInWithEmailAndPassword,
      auth,
      email,
      password
    );

    if (process.env.NODE_ENV === "development") {
      console.log("user.sagas.js, signInWithEmail, Auth User Ref:", user);
    }

    yield call(setCurrentUserSaga, user);
  } catch (err) {
    yield put(signInFailure(err));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "user.sagas.js, signInWithEmail, Error signing in with email and password:",
        err.message
      );
    }
    alert("An error occurred while trying to sign in with email and password.");
  }
}

function* onGoogleSignInStartSaga() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogleSaga);
}

function* onEmailSignInStartSaga() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailSaga);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStartSaga), call(onEmailSignInStartSaga)]);
}