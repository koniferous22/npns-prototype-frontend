import { confirmUsernameChangeConstants } from '../../../constants/content/confirm/usernameChange'

function confirmUsernameChangeReducer(state={}, action) {
	switch (action.type) {
		case confirmUsernameChangeConstants.REQUEST:
			return {
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case confirmUsernameChangeConstants.SUCCESS:
			return {
				message: "Username successfully changed",
				messageType: action.messageType,
				verified: true
			}
		case confirmUsernameChangeConstants.FAILED:
			return {
				message: action.message,
				messageType: action.messageType,
				verified: false
			}
		default:
			return state
	}
}

export default confirmUsernameChangeReducer
