import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { appConfig } from '../appConfig'

import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'
import globalReducer from './global'

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	global: globalReducer// ,
	// content: contentReducer
})


const logger = createLogger();

const middlewares = appConfig.enableLogger ? [thunkMiddleware, logger] : [thunkMiddleware]

export default store = createStore(
	rootReducer,
	applyMiddleware(
		...middlewares
	)
);
