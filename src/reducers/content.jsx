import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer
})
