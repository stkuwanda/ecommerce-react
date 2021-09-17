import React from "react";
import { connect } from "react-redux";
import { clearItemFromCart, removeItem, addCartItem } from "../../redux/cart/cart.actions";
import "./checkout-item.styles.scss";

const CheckoutItem = ({
  cartItem: { id, name, imageUrl, quantity, price },
  dispatch,
}) => (
  <div className='checkout-item'>
    <div className='image-container'>
      <img src={imageUrl} alt='Cart Item' />
    </div>
    <span className='name'>{name}</span>
    <div className='quantity'>
      <div
        className='arrow'
        onClick={() => dispatch(removeItem({ id, quantity }))}
      >
        &#10094;
      </div>
      <span className='value'>{quantity}</span>
      <div className='arrow' onClick={() => dispatch(addCartItem({ id, quantity }))}>&#10095;</div>
    </div>
    <span className='price'>{price}</span>
    <div
      className='remove-button'
      onClick={() => dispatch(clearItemFromCart({ id }))}
    >
      &#10005;
    </div>
  </div>
);

export default connect(null)(CheckoutItem);
