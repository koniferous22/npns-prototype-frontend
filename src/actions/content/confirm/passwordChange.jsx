import { appConfig } from '../../../appConfig'
import { confirmPasswordChangeConstants } from '../../../constants/content/confirm/passwordChange'
import { messageType } from '../../../constants/backendMessageType'

function verify(confirmationToken) {
	const request = () => ({type: confirmPasswordChangeConstants.VERIFY_REQUEST})
	const success = () => ({type: confirmPasswordChangeConstants.VERIFY_SUCCESS})
	const failure = (message) => ({type: confirmPasswordChangeConstants.VERIFY_FAILED, message, messageType: messageType.ERROR})

	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/verify/newPasswordRequest", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({emailToken: confirmationToken})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				dispatch(success())
			} else {
				var error = new Error(response.message)
				error.response = response
				throw error
			}
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function confirm(confirmationToken, password)  {
	const request = () => ({type: confirmPasswordChangeConstants.CONFIRM_REQUEST})
	const success = () => ({type: confirmPasswordChangeConstants.CONFIRM_SUCCESS})
	const failure = (message) => ({type: confirmPasswordChangeConstants.CONFIRM_FAILED, message})

	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/u/passwordReset/confirm", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({emailToken: confirmationToken, password})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				dispatch(success())
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function reset() {
	return {
		type: confirmPasswordChangeConstants.RESET
	}
}

export const confirmPasswordChangeActions = {
	verify,
	confirm,
	reset
}
