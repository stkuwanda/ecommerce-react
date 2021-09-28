import { ShopActionTypes } from "./shop.types";
const INITIAL_STATE = { SHOP_DATA: {} };

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.UPDATE_COLLECTIONS:
      return { ...state, SHOP_DATA: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
