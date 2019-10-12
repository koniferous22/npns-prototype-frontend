import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'
import queuePageReducer from './content/queuePage'
import problemPageReducer from './content/problemPage'
import submitProblemTempReducer from './content/submitProblemTemp'
import profileReducer from './content/profile'
import confirmReducer from './content/confirm'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	queuePage: queuePageReducer,
	problemPage: problemPageReducer,
	submitProblem: submitProblemTempReducer,
	confirm: confirmReducer,
	profile: profileReducer
})
