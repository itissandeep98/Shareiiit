import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { bookReducer } from "./bookReducer";
import { electronicsReducer } from "./electonicsReducer";
import { groupReducer } from "./groupReducer";
import { otherReducer } from "./otherReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  books: bookReducer,
  groups: groupReducer,
  electronics: electronicsReducer,
  others: otherReducer,
});

export default rootReducer;
