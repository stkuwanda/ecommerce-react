import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const selectShop = (state) => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  (shop) => shop.SHOP_DATA
);

export const selectCollections = createSelector([selectShop], (shop) =>
  Object.values(shop.SHOP_DATA)
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectShopData], (shopData) =>
    shopData[collectionUrlParam] ? shopData[collectionUrlParam] : null
  )
);
