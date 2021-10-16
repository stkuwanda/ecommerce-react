import React from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleHideCartDropdown } from "../../redux/cart/cart.actions";

const CartDropdown = () => {
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div className='cart-dropdown'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => <CartItem key={item.id} item={item} />)
        ) : (
          <span className='empty-message'>
            Start Filling Your Shopping Cart
          </span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleHideCartDropdown());
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
