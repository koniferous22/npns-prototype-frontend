import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { auth } from './auth'
import { homepageAlert } from './alert'
import { getAllQueues } from './queue'


const rootReducer = combineReducers({
	form: formReducer,
	auth: auth,
	alert: homepageAlert,
	queue: getAllQueues
})

export default rootReducer
