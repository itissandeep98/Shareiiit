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
      secretKey: "as5a168asd1a8a3fds5g157x687sd",
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
