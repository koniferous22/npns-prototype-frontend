import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { authReducer } from './auth'
import { globalReducer } from './global'
import { contentReducer } from './content'

const rootReducer = combineReducers({
	form: formReducer,
	auth: authReducer,
	global: globalReducer,
	content: contentReducer
})

export default rootReducer
