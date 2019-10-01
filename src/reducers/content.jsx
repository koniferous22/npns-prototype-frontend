import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'
import queuePageReducer from './content/queuePage'
import problemPageReducer from './content/problemPage'
import submitProblemTempReducer from './content/submitProblemTemp'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	queuePage: queuePageReducer,
	problemPage: problemPageReducer,
	submitProblem: submitProblemTempReducer
})