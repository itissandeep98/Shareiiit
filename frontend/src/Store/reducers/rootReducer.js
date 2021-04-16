import { combineReducers } from "redux";
import { authReducer, detailsReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { peopleReducer } from "./peopleReducer";

import localForage from "localforage";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";

const persistConfig = {
  key: "root",
  storage: localForage,
  transforms: [
    encryptTransform({
      secretKey: "fas56a5das1d19a8sasf646a8s6a54sd98",
    }),
  ],
};

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,
  user: detailsReducer,
  people: peopleReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
