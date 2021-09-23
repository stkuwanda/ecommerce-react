import React from "react";
import { connect } from "react-redux";
import { addCartItem } from "../../redux/cart/cart.actions";
import "./collection-item.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import { selectCartItem } from "../../redux/cart/cart.selectors";
import { AddButton, CollectionFooterContainer, CollectionItemContainer, ImageContainer, NameSpan, PriceSpan } from "./collection-item.styles";

const CollectionItem = ({ item, cartItem, addCartItem }) => {
  const { name, imageUrl, price } = item;

  return (
    <CollectionItemContainer>
      <ImageContainer className='image' imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameSpan>{name}</NameSpan>
        <PriceSpan>${`${price} ${cartItem ? 'x ' + cartItem.quantity : ''}`}</PriceSpan>
      </CollectionFooterContainer>
      <AddButton isInverted onClick={() => addCartItem(item)}>
        ADD TO CART
      </AddButton>
    </CollectionItemContainer>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCartItem: (cartItem) => dispatch(addCartItem(cartItem)),
});

const mapStateToProps = (state, { item }) => ({
  cartItem: selectCartItem(item)(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionItem);
