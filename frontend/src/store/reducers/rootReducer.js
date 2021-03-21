import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { bookReducer } from "./bookReducer";
import { electronicsReducer } from "./electonicsReducer";
import { groupReducer } from "./groupReducer";
import { otherReducer } from "./otherReducer";
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
  books: bookReducer,
  groups: groupReducer,
  electronics: electronicsReducer,
  others: otherReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
