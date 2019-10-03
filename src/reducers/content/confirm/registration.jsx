import { confirmRegistrationConstants } from '../../../constants/content/confirm/registration'

function confirmRegistrationReducer(state={}, action) {
	switch (action.type) {
		case confirmRegistrationConstants.REQUEST:
			return {
				message: "Waiting for server response"
			}
		case confirmRegistrationConstants.SUCCESS:
			return {
				message: "Email verified",
				verified: true
			}
		case confirmRegistrationConstants.FAILED:
			return {
				message: action.message,
				verified: false
			}
		default:
			return state
	}
}

export default confirmRegistrationReducer