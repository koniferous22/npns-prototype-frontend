import { confirmEmailChangeConstants } from '../../../constants/content/confirm/emailChange'

function confirmEmailChangeReducer(state={}, action) {
	switch (action.type) {
		case confirmEmailChangeConstants.REQUEST:
			return {
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case confirmEmailChangeConstants.SUCCESS:
			return {
				message: "Email successfully changed",
				messageType: action.messageType,
				verified: true
			}
		case confirmEmailChangeConstants.FAILED:
			return {
				message: action.message,
				messageType: action.messageType,
				verified: state.verified || false
			}
		default:
			return state
	}
}

export default confirmEmailChangeReducer
