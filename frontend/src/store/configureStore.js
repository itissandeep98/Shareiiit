import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers/rootReducer";
import persistStore from "redux-persist/es/persistStore";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(
  rootReducer,
  composeEnhancers(
    process.env.NODE_ENV === "production"
      ? applyMiddleware(thunk)
      : applyMiddleware(thunk, logger)
  )
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };
