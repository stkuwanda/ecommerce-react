import { createSelector } from "reselect";
import memoize from "lodash.memoize";

export const selectCart = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartItemsQuantity = createSelector(
  [selectCartItems],
  (cartItems) => cartItems.reduce((acc, item) => item.quantity + acc, 0)
);

export const selectCartDropDownHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartTotalPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0)
);

export const selectCartItem = memoize((item) =>
  createSelector([selectCartItems], (cartItems) =>
    cartItems.find((cartItem) => cartItem.id === item.id)
  )
);
