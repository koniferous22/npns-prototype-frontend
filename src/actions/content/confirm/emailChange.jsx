import { appConfig } from '../../../appConfig'
import { confirmEmailChangeConstants } from '../../../constants/content/confirm/emailChange'

function confirm(confirmationToken, authToken)  {
	const request = () => ({type: confirmEmailChangeConstants.REQUEST})
    const success = () => ({type: confirmEmailChangeConstants.SUCCESS})
    const failure = (message) => ({type: confirmEmailChangeConstants.FAILED, message})

	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/verify/newEmail", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
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
            dispatch(failure(error))
        })
	}
}

const confirmEmailChangeActions = {
	confirm
}