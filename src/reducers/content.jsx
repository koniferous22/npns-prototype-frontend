import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'
import forgotPasswordReducer from './content/forgotPasswordPage'
import queuePageReducer from './content/queuePage'
import problemPageReducer from './content/problemPage'
import economyPageReducer from './content/economyPage'
import submitProblemPageReducer from './content/submitProblemPage'
import profileReducer from './content/profile'
import confirmReducer from './content/confirm'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	forgotPassword: forgotPasswordReducer,
	queuePage: queuePageReducer,
	problemPage: problemPageReducer,
	submitProblemPage: submitProblemPageReducer,
	economyPage: economyPageReducer,
	confirm: confirmReducer,
	profile: profileReducer
})
