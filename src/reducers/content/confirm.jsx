import { combineReducers } from 'redux'

import confirmRegistrationReducer from './confirm/registration'
import confirmEmailChangeReducer from './confirm/emailChange'
import confirmUsernameChangeReducer from './confirm/usernameChange'
import confirmPasswordChangeReducer from './confirm/passwordChange'

export default combineReducers({
	registration: confirmRegistrationReducer,
	emailChange: confirmEmailChangeReducer,
	usernameChange: confirmUsernameChangeReducer,
	passwordChange: confirmPasswordChangeReducer
})