import { confirmUsernameChangeConstants } from '../../../constants/content/confirm/usernameChange'

function confirmUsernameChangeReducer(state={}, action) {
	switch (action.type) {
		case confirmUsernameChangeConstants.REQUEST:
			return {
				message: "Waiting for server response"
			}
		case confirmUsernameChangeConstants.SUCCESS:
			return {
				message: "Username successfully changed",
				verified: true
			}
		case confirmUsernameChangeConstants.FAILED:
			return {
				message: action.message,
				verified: false
			}
		default:
			return state
	}
}

export default confirmUsernameChangeReducer