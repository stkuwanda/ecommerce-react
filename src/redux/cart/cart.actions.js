import { CartActionTypes } from "./cart.types";

// Action Creator Functions
export const toggleHideCartDropdown = () => ({
  type: CartActionTypes.TOGGLE_HIDE_CART_DROPDOWN,
});

export const addCartItem = (cartItem) => ({
  type: CartActionTypes.ADD_CART_ITEM,
  payload: cartItem,
});

export const clearItemFromCart = (cartItem) => ({
  type: CartActionTypes.CLEAR_ITEM_FROM_CART,
  payload: cartItem,
});

export const removeItem = (cartItem) => ({
  type: CartActionTypes.RENOVE_ITEM,
  payload: cartItem,
});

export const clearCart = () => ({ type: CartActionTypes.CLEAR_CART });
