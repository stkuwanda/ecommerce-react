import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signInWithPopup,
  createUserProfileDocument,
  auth,
  googleProvider,
  getDoc,
  signInWithEmailAndPassword,
  getCurrentAuthUser,
} from "../../firebase/firebase.utils";
import UserActionTypes from "./user.types";
import {
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
} from "./user.actions";

function* signOutUserSaga() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "user.sagas.js, signOutUserSaga, Error signing out:",
        err.message
      );
    }
    alert("An error occurred while trying to sign out.");
  }
}

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
    alert("Sign in with Google failed. Check your network and try again.");
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
    alert(
      "Sign in failed. Check your network and verify your credentials before reattempting to sign in."
    );
  }
}

function* isUserAuthenticatedSaga() {
  try {
    const userAuth = yield call(getCurrentAuthUser);

    if (!userAuth) return;

    yield call(setCurrentUserSaga, userAuth);
  } catch (err) {
    yield put(signInFailure(err));

    if (process.env.NODE_ENV === "development") {
      console.log(
        "user.sagas.js, isUserAuthenticatedSaga, Error signing in:",
        err.message
      );
    }

    alert("This session could not be authenticated. Try again later.");
  }
}

function* onGoogleSignInStartSaga() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogleSaga);
}

function* onEmailSignInStartSaga() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmailSaga);
}

function* onCheckUserSessionSaga() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticatedSaga);
}

function* onSignOutStartSaga() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOutUserSaga);
}

export function* userSagas() {
  yield all([
    call(onGoogleSignInStartSaga),
    call(onEmailSignInStartSaga),
    call(onCheckUserSessionSaga),
    call(onSignOutStartSaga),
  ]);
}
