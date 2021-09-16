import React from "react";
import { connect } from "react-redux";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { toggleHideCartDropdown } from "../../redux/cart/cart.actions";
import "./cart-icon.styles.scss";

const CartIcon = ({toggleHideCartDropdown}) => (
  <div className='cart-icon' onClick={toggleHideCartDropdown}>
    <ShoppingIcon className='shopping-icon' />
    <span className='item-count'>0</span>
  </div>
);

const mapDispatchToProps = dispatch => {
  return {toggleHideCartDropdown: () => dispatch(toggleHideCartDropdown())}
}

export default connect(null, mapDispatchToProps)(CartIcon);
