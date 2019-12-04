import { confirmRegistrationConstants } from '../../../constants/content/confirm/registration'

function confirmRegistrationReducer(state={}, action) {
	switch (action.type) {
		case confirmRegistrationConstants.REQUEST:
			return {
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case confirmRegistrationConstants.SUCCESS:
			return {
				message: "Email verified",
				messageType: action.messageType,
				verified: true
			}
		case confirmRegistrationConstants.FAILED:
			return {
				message: action.message,
				messageType: action.messageType,
				verified: state.verified || false
			}
		default:
			return state
	}
}

export default confirmRegistrationReducer
