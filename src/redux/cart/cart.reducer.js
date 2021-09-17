import { CartActionTypes } from "./cart.types";
import { addCartItem, removeCartItem } from "./cart.utils";

const INITIAL_STATE = { hidden: true, cartItems: [] };

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_HIDE_CART_DROPDOWN:
      return { ...state, hidden: !state.hidden };
    case CartActionTypes.ADD_CART_ITEM:
      return {
        ...state,
        cartItems: addCartItem(state.cartItems, action.payload),
      };
    case CartActionTypes.RENOVE_ITEM:
      return {
        ...state,
        cartItems: removeCartItem(state.cartItems, action.payload)
      };
    case CartActionTypes.CLEAR_ITEM_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

export default cartReducer;
