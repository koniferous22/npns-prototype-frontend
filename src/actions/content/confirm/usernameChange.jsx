import { appConfig } from '../../../appConfig'
import { confirmUsernameChangeConstants } from '../../../constants/content/confirm/usernameChange'

function confirm(confirmationToken)  {
	const request = () => ({type: confirmUsernameChangeConstants.REQUEST})
	const success = () => ({type: confirmUsernameChangeConstants.SUCCESS})
	const failure = (message) => ({type: confirmUsernameChangeConstants.FAILED, message})

	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/verify/newUsername", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'/*, 'Authorization': 'Bearer ' + authToken*/ },
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
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

export const confirmUsernameChangeActions = {
	confirm
}