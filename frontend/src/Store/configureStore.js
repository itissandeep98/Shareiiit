import { applyMiddleware, compose, createStore } from 'redux';
import logger from 'redux-logger';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = createStore(
	rootReducer,
	composeEnhancers(
		process.env.NODE_ENV === 'production'
			? applyMiddleware(thunk)
			: applyMiddleware(thunk, logger)
	)
);

const persistor = persistStore(configureStore);

export { configureStore, persistor };
