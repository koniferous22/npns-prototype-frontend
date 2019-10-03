import { confirmPasswordChangeConstants } from '../../../constants/content/confirm/passwordChange'

function confirmPasswordChangeReducer(state={}, action) {
	switch (action.type) {
		case confirmPasswordChangeConstants.REQUEST:
			return {
				message: "Waiting for server response"
			}
		case confirmPasswordChangeConstants.SUCCESS:
			return {
				message: "Password successfully changed",
				verified: true
			}
		case confirmPasswordChangeConstants.FAILED:
			return {
				message: action.message,
				verified: false
			}
		default:
			return state
	}
}

export default confirmPasswordChangeReducer