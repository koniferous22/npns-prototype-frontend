import { combineReducers } from 'redux'

import signupReducer from './content/signupPage'
import loginReducer from './content/loginPage'
import forgotPwdReducer from './content/forgotPwdPage'
import queuePageReducer from './content/queuePage'
import problemPageReducer from './content/problemPage'
import editReducer from './content/edit'
import statisticsReducer from './content/statistics'
import submitProblemPageReducer from './content/submitProblemPage'
import boostPageReducer from './content/boost'
import profileReducer from './content/profile'
import confirmReducer from './content/confirm'
import attachmentUploadReducer from './content/attachmentUpload'

export const contentReducer = combineReducers({
	signup: signupReducer,
	login: loginReducer,
	forgotPwd: forgotPwdReducer,
	queuePage: queuePageReducer,
	problemPage: problemPageReducer,
	edit: editReducer,
	submitProblem: submitProblemPageReducer,
	boost: boostPageReducer,
	statistics: statisticsReducer,
	confirm: confirmReducer,
	profile: profileReducer,
	attachmentUpload: attachmentUploadReducer
})
