import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'
import forgotPwdReducer from './content/forgotPwdPage'
import queuePageReducer from './content/queuePage'
import problemPageReducer from './content/problemPage'
import economyPageReducer from './content/economyPage'
import submitProblemPageReducer from './content/submitProblemPage'
import profileReducer from './content/profile'
import confirmReducer from './content/confirm'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	forgotPwd: forgotPwdReducer,
	queuePage: queuePageReducer,
	problemPage: problemPageReducer,
	submitProblem: submitProblemPageReducer,
	economyPage: economyPageReducer,
	confirm: confirmReducer,
	profile: profileReducer
})
