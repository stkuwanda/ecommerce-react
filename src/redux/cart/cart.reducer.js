import { CartActionTypes } from "./cart.types";
import { addCartItem } from "./cart.utils";

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
    default:
      return state;
  }
};

export default cartReducer;
