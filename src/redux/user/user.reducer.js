import UserActionTypes from "./user.types";

const INITIAL_STATE = { currentUser: null, error: null, isLoading: false };

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.START_LOADER:
      return { ...state, isLoading: true };
    case UserActionTypes.STOP_LOADER:
      return { ...state, isLoading: false };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return { ...state, currentUser: action.payload, error: null };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return { ...state, currentUser: null, error: null };
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_IN_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
