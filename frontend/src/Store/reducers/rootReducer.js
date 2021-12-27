import { combineReducers } from "redux";
import { authReducer, detailsReducer } from "./userReducer";
import { postReducer } from "./postReducer";
import { peopleReducer } from "./peopleReducer";
import localForage from "localforage";
import { persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { skillReducer } from "./skillReducer";
import { notificationReducer } from "./notificationReducer";

const persistConfig = {
	key: "root",
	storage: localForage,
	transforms: [
		encryptTransform({
			secretKey: "fas56asfsdmnasdaf64asda6a8s6a54sd98",
		}),
	],
};

const rootReducer = combineReducers({
	auth: authReducer,
	posts: postReducer,
	skill: skillReducer,
	user: detailsReducer,
	people: peopleReducer,
	notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
