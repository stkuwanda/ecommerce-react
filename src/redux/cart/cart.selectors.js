import { createSelector } from "reselect";

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
