import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { confirmPasswordChangeConstants, confirmPasswordChangeStages } from '../../../constants/content/confirm/passwordChange'

function confirmPasswordChangeReducer(state={}, action) {
	switch (action.type) {
		case confirmPasswordChangeConstants.VERIFY_REQUEST:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM,
				message: "Verifying token sent via email"
			}
		case confirmPasswordChangeConstants.VERIFY_SUCCESS:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM
			}
		case confirmPasswordChangeConstants.VERIFY_FAILED:
			return {
				stage: confirmPasswordChangeStages.INVALID_TOKEN,
				message: "Invalid token"
			}
		case confirmPasswordChangeConstants.CONFIRM_REQUEST:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM,
				message: "Waiting for server response"
			}
		case confirmPasswordChangeConstants.CONFIRM_SUCCESS:
			return {
				stage: confirmPasswordChangeStages.COMPLETED,
				message: "Password successfully changed",
				verified: true
			}
		case confirmPasswordChangeConstants.CONFIRM_FAILED:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM,
				message: action.message,
				verified: false
			}
		case confirmPasswordChangeConstants.RESET:
			return {
				stage: confirmPasswordChangeStages.INVALID_TOKEN
			}
		default:
			return state
	}
}

const passwordChangeFormReducer = reducer;

export default combineReducers({
	page: confirmPasswordChangeReducer,
	form: passwordChangeFormReducer
})