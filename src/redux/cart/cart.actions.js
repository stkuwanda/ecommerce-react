import { CartActionTypes } from "./cart.types";

// Action Creator Functions
export const toggleHideCartDropdown = () => ({
  type: CartActionTypes.TOGGLE_HIDE_CART_DROPDOWN,
});

export const addCartItem = (cartItem) => ({
  type: CartActionTypes.ADD_CART_ITEM,
  payload: cartItem,
});
