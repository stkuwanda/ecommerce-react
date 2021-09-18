import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
import rootReducer from "./root.reducer";

const middlewares = [logger];
const store = createStore(rootReducer, applyMiddleware(...middlewares)); //unpersisted store
const persistor = persistStore(store); //persisted store

export { store, persistor };
