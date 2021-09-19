import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartReducer from "./cart/cart.reducer";
import userReducer from "./user/user.reducer";
import directoryReducer from "./directory/directory.reducer";

const persistConfig = { key: "root", storage, whitelist: ["cart"] };

const unpersistedRootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer
});

const persistedRootReducer = persistReducer(
  persistConfig,
  unpersistedRootReducer
);

const rootReducer = persistedRootReducer;

export default rootReducer;
