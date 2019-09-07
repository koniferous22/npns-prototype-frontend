import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { authReducer } from './auth'
import { globalReducer } from './global'

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	global: globalReducer
	//queue: getAllQueues
})

export default rootReducer
