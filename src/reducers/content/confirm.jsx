import { combineReducers } from 'redux'

import confirmRegistrationReducer from './confirm/registration'
import confirmEmailChangeReducer from './confirm/emailChange'
import confirmPasswordChangeReducer from './confirm/passwordChange'

export default combineReducers({
	registration: confirmRegistrationReducer,
	emailChange: confirmEmailChangeReducer,
	passwordChange: confirmPasswordChangeReducer
})