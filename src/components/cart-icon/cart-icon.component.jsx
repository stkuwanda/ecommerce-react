import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleHideCartDropdown } from "../../redux/cart/cart.actions";
import { selectCartItemsQuantity } from "../../redux/cart/cart.selectors";
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

const mapStateToProps = createStructuredSelector({
  cartItemCount: selectCartItemsQuantity,
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
