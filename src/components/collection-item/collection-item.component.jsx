import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "../../redux/cart/cart.actions";
import "./collection-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { selectCartItem } from "../../redux/cart/cart.selectors";

const CollectionItem = ({ item, cartItem, addCartItem }) => {
  const { name, imageUrl, price } = item;

  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>${`${price} ${cartItem ? 'x ' + cartItem.quantity : ''}`}</span>
      </div>
      <CustomButton isInverted onClick={() => addCartItem(item)}>
        ADD TO CART
      </CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (cartItem) => dispatch(addCartItem(cartItem)),
});

const mapStateToProps = (state, { item }) => ({
  cartItem: selectCartItem(item)(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
