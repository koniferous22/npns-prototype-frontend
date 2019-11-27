import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/root';
import { appConfig } from './appConfig'

const logger = createLogger();

const args = appConfig.enableLogger ? [thunkMiddleware, logger] : [thunkMiddleware]

export const store = createStore(
	rootReducer,
	applyMiddleware(
		...args
	)
);
