import { appConfig } from '../../../appConfig'
import { confirmRegistrationConstants } from '../../../constants/content/confirm/registration'
import { messageType } from '../../../constants/misc/backendMessageTypes'

function confirm(confirmationToken)  {
	const request = () => ({type: confirmRegistrationConstants.REQUEST})
	const success = () => ({type: confirmRegistrationConstants.SUCCESS})
	const failure = (message) => ({type: confirmRegistrationConstants.FAILED, message, messageType: messageType.ERROR})

	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/verify/registration", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({emailToken: confirmationToken})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				dispatch(success())
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).catch(error => {
			// temporary, was testing that, bit bad when rendering
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

export const confirmRegistrationActions = {
	confirm
}
