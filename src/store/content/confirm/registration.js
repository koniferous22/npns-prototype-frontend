import { appConfig } from '../../../appConfig'
import { messageType } from '../../../constants/misc/backendMessageTypes'

import { fetchData } from '../../../utils'

const REQUEST = "CONFIRM_REGISTRATION_REQUEST"
const SUCCESS = "CONFIRM_REGISTRATION_SUCCESS"
const FAILED = "CONFIRM_REGISTRATION_FAILED"

export default function confirmRegistrationReducer(state={}, action) {
	switch (action.type) {
		case REQUEST:
			return {
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case SUCCESS:
			return {
				message: "Email verified",
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
	const request = () => ({type: REQUEST})
	const success = () => ({type: SUCCESS})
	const failure = (message) => ({type: FAILED, message, messageType: messageType.ERROR})

	return fetchData(
		"/verify/registration",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({emailToken: confirmationToken})
		},
		request,
		success,
		failure
	)
}
