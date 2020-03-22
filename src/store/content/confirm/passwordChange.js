import { reducer as passwordChangeFormReducer } from 'redux-form'
import { combineReducers } from 'redux'

import { fetchData } from '../../utils'

const VERIFY_REQUEST = "VERIFY_PASSWORD_CHANGE_REQUEST"
const VERIFY_SUCCESS = "VERIFY_PASSWORD_CHANGE_SUCCESS"
const VERIFY_FAILED = "VERIFY_PASSWORD_CHANGE_FAILED"

const CONFIRM_REQUEST = "CONFIRM_PASSWORD_CHANGE_REQUEST"
const CONFIRM_SUCCESS = "CONFIRM_PASSWORD_CHANGE_SUCCESS"
const CONFIRM_FAILED = "CONFIRM_PASSWORD_CHANGE_FAILED"

const RESET = "PASSWORD_CHANGE_RESET"

export const confirmPasswordChangeStages = {
	INVALID_TOKEN: 0,
	SUBMITTING_FORM: 1,
	COMPLETED: 2
}

function confirmPasswordChangeReducer(state={}, action) {
	switch (action.type) {
		case VERIFY_REQUEST:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM,
				message: "Verifying token sent via email",
				messageType: action.messageType
			}
		case VERIFY_SUCCESS:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM
			}
		case VERIFY_FAILED:
			return {
				stage: confirmPasswordChangeStages.INVALID_TOKEN,
				message: "Invalid token",
				messageType: action.messageType
			}
		case CONFIRM_REQUEST:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM,
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case CONFIRM_SUCCESS:
			return {
				stage: confirmPasswordChangeStages.COMPLETED,
				message: "Password successfully changed",
				messageType: action.messageType,
				verified: true
			}
		case CONFIRM_FAILED:
			return {
				stage: confirmPasswordChangeStages.SUBMITTING_FORM,
				message: action.message,
				messageType: action.messageType,
				verified: state.verified || false
			}
		case RESET:
			return {
				stage: confirmPasswordChangeStages.INVALID_TOKEN
			}
		default:
			return state
	}
}

export default combineReducers({
	page: confirmPasswordChangeReducer,
	form: passwordChangeFormReducer
})


export function verify(confirmationToken) {
	const request = () => ({type: VERIFY_REQUEST})
	const success = () => ({type: VERIFY_SUCCESS})
	const failure = (message) => ({type: VERIFY_FAILED, message, messageType: messageType.ERROR})

	return fetchData(
		"/verify/newPasswordRequest",
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

export const confirm = (confirmationToken, password) => {
	const request = () => ({type: CONFIRM_REQUEST})
	const success = () => ({type: CONFIRM_SUCCESS})
	const failure = (message) => ({type: CONFIRM_FAILED, message})

	return fetchData(
		"/u/passwordReset/confirm",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({emailToken: confirmationToken, password})
		},
		request,
		success,
		failure
	)
}

export const reset = () => ({
	type: RESET
})
