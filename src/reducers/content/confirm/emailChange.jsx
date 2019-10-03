import { confirmEmailChangeConstants } from '../../../constants/content/confirm/emailChange'

function confirmEmailChangeReducer(state={}, action) {
	switch (action.type) {
		case confirmEmailChangeConstants.REQUEST:
			return {
				message: "Waiting for server response"
			}
		case confirmEmailChangeConstants.SUCCESS:
			return {
				message: "Email successfully changed",
				verified: true
			}
		case confirmEmailChangeConstants.FAILED:
			return {
				message: action.message,
				verified: false
			}
		default:
			return state
	}
}

export default confirmEmailChangeReducer