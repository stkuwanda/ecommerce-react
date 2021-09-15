import { UserActionTypes } from "./user.types";

// Action Creator Functions
export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
