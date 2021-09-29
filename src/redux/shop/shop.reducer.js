import { ShopActionTypes } from "./shop.types";
const INITIAL_STATE = {
  SHOP_DATA: {},
  isFetching: false,
  errMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return { ...state, isFetching: true };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return { ...state, SHOP_DATA: action.payload, isFetching: false };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return { ...state, isFetching: false, errMessage: action.payload };
    default:
      return state;
  }
};

export default shopReducer;
