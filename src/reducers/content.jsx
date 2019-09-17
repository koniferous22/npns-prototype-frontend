import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'
import queuePageReducer from './content/queuePage'
import submitProblemTempReducer from './content/submitProblemTemp'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	queuePage: queuePageReducer,
	submitProblem: submitProblemTempReducer
})
