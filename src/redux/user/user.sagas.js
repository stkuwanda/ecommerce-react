import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signInWithPopup,
  createUserProfileDocument,
  auth,
  googleProvider,
  getDoc,
} from "../../firebase/firebase.utils";
import UserActionTypes from "./user.types";
import { googleSignInFailure, googleSignInSuccess } from "./user.actions";

function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);

    if (process.env.NODE_ENV === "development") {
      console.log("user.sagas.js, signInWithPopup, Auth User Ref:", user);
    }

    const userDocRef = yield call(createUserProfileDocument, user);
    const userDocSnap = yield getDoc(userDocRef);
    yield put(
      googleSignInSuccess({ id: userDocSnap.id, ...userDocSnap.data() })
    );
  } catch (err) {
    yield put(googleSignInFailure(err));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "user.sagas.js, signInWithPopup, Error signing in with Google:",
        err.message
      );
    }
    alert("An error occurred while trying to sign in with Google.");
  }
}

function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
