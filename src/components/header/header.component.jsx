import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import {
  HeaderContainer,
  LinkOptionContainer,
  LogoContainer,
  OptionsContainer,
} from "./header.styles";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCartDropDownHidden } from "../../redux/cart/cart.selectors";

const Header = ({ currentUser, isCartDropDownHidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <Logo className='logo' />
    </LogoContainer>
    <OptionsContainer>
      <LinkOptionContainer to='/shop'>
        SHOP
      </LinkOptionContainer>
      <LinkOptionContainer to='/contacts'>
        CONTACTS
      </LinkOptionContainer>
      {currentUser ? (
        <LinkOptionContainer as='div' onClick={() => auth.signOut()}>
          SIGN OUT
        </LinkOptionContainer>
      ) : (
        <LinkOptionContainer to='/signin'>
          SIGN IN
        </LinkOptionContainer>
      )}
      <CartIcon />
    </OptionsContainer>
    {isCartDropDownHidden ? null : <CartDropdown />}
  </HeaderContainer>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isCartDropDownHidden: selectCartDropDownHidden,
});

export default connect(mapStateToProps)(Header);
