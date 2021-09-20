import { createSelector } from "reselect";
import memoize from "lodash.memoize";

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 4,
  womens: 4,
  mens: 5,
};

const selectShop = (state) => state.shop;

export const selectShopData = createSelector(
  [selectShop],
  (shop) => shop.SHOP_DATA
);

export const selectCollection = memoize((collectionUrlParam) =>
  createSelector([selectShopData], (shopData) =>
    shopData.find(
      (collection) => collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    )
  )
);
