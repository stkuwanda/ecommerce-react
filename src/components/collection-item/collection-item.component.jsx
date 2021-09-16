import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "../../redux/cart/cart.actions";
import "./collection-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";

const CollectionItem = ({ item, addCartItem }) => {
  const { name, imageUrl, price } = item;

  return (
    <div className='collection-item'>
      <div className='image' style={{ backgroundImage: `url(${imageUrl})` }} />
      <div className='collection-footer'>
        <span className='name'>{name}</span>
        <span className='price'>{price}</span>
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

export default connect(null, mapDispatchToProps)(CollectionItem);
