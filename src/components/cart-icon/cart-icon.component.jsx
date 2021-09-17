import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleHideCartDropdown } from "../../redux/cart/cart.actions";
import "./cart-icon.styles.scss";

const CartIcon = ({ toggleHideCartDropdown, cartItemCount }) => (
  <div className='cart-icon' onClick={toggleHideCartDropdown}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>{cartItemCount}</span>
  </div>
);

const mapDispatchToProps = (dispatch) => {
  return { toggleHideCartDropdown: () => dispatch(toggleHideCartDropdown()) };
};

const mapStateToProps = ({ cart: { cartItems } }) => ({
  cartItemCount: cartItems.reduce((acc, item) => item.quantity + acc, 0),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
