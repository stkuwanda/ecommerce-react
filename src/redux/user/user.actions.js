import UserActionTypes from "./user.types";

// Action Creator Functions
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (err) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: err,
});

export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (err) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: err,
});

export const signUpStart = (userCredentials) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: userCredentials,
});

export const signUpSuccess = ({ user, otherData }) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: { user, otherData },
});

export const signUpFailure = (err) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: err,
});

export const startLoader = () => ({ type: UserActionTypes.START_LOADER });

export const stopLoader = () => ({ type: UserActionTypes.STOP_LOADER });
