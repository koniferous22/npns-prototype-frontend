import { combineReducers } from 'redux'

import confirmRegistrationReducer from './registration'
import confirmEmailChangeReducer from './emailChange'
import confirmUsernameChangeReducer from './usernameChange'
import confirmPasswordChangeReducer from './passwordChange'

export default combineReducers({
	registration: confirmRegistrationReducer,
	emailChange: confirmEmailChangeReducer,
	usernameChange: confirmUsernameChangeReducer,
	passwordChange: confirmPasswordChangeReducer
})