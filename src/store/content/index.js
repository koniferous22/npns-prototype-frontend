import { combineReducers } from 'redux'

import signUpReducer from './signUpPage'
import loginReducer from './loginPage'
import forgotPwdReducer from './forgotPwdPage'
import queuePageReducer from './queuePage'
import problemPageReducer from './problemPage'
import statisticsReducer from './statistics'
import submitProblemPageReducer from './submitProblemPage'
import boostPageReducer from './boost'
import profileReducer from './profile'
import confirmReducer from './confirm'
import attachmentUploadReducer from './attachmentUpload'

export default combineReducers({
	signUp: signUpReducer,
	login: loginReducer,
	forgotPwd: forgotPwdReducer,
	queuePage: queuePageReducer,
	problemPage: problemPageReducer,
	submitProblem: submitProblemPageReducer,
	boost: boostPageReducer,
	statistics: statisticsReducer,
	confirm: confirmReducer,
	profile: profileReducer,
	attachmentUpload: attachmentUploadReducer
})
