import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { enableLogger } from '../appConfig'

import { reducer as formReducer } from 'redux-form'
import authReducer from './auth'
import contentReducer from './content'
import globalReducer from './global'

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	global: globalReducer,
	content: contentReducer
})


const logger = createLogger();

const middlewares = enableLogger ? [thunkMiddleware, logger] : [thunkMiddleware]

export default createStore(
	rootReducer,
	applyMiddleware(
		...middlewares
	)
);
