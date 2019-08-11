import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { login } from './login-reducer'
import { registration } from './registration-reducer'
import { homepageAlert } from './alert-reducer'
import { getAllQueues } from './queue-reducer'


const rootReducer = combineReducers({
	form: formReducer,
	login: login,
	registration: registration,
	alert: homepageAlert,
	queue: getAllQueues
})

export default rootReducer
