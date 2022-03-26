import localForage from 'localforage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { notificationReducer } from './notificationReducer';
import { peopleReducer } from './peopleReducer';
import { postReducer } from './postReducer';
import { skillReducer } from './skillReducer';
import { authReducer, detailsReducer } from './userReducer';

const persistConfig = {
	key: 'root',
	storage: localForage,
	transforms: [
		encryptTransform({
			secretKey: 'fas5mxckmnasdafsda8s6a54sd98',
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
