import { appConfig } from '../../../appConfig'
import { messageType } from '../../../constants/misc/backendMessageTypes'
import { fetchData } from '../../../utils'

const REQUEST = "CONFIRM_USERNAME_CHANGE_REQUEST"
const SUCCESS = "CONFIRM_USERNAME_CHANGE_SUCCESS"
const FAILED = "CONFIRM_USERNAME_CHANGE_FAILED"

export default function confirmUsernameChangeReducer(state={}, action) {
	switch (action.type) {
		case REQUEST:
			return {
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case SUCCESS:
			return {
				message: "Username successfully changed",
				messageType: action.messageType,
				verified: true
			}
		case FAILED:
			return {
				message: action.message,
				messageType: action.messageType,
				verified: state.verified || false
			}
		default:
			return state
	}
}

export const confirm = (confirmationToken) => {
	const request = () => ({type: confirmUsernameChangeConstants.REQUEST})
	const success = () => ({type: confirmUsernameChangeConstants.SUCCESS})
	const failure = (message) => ({type: confirmUsernameChangeConstants.FAILED, message, messageType: messageType.ERROR})

	return fetchData(
		"/verify/newUsername",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json'/*, 'Authorization': 'Bearer ' + authToken*/ },
			body: JSON.stringify({emailToken: confirmationToken})
		},
		request,
		success,
		failure
	)
}