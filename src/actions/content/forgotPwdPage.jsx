import { forgotPwdConstants } from '../../constants/content/forgotPwdPage'
import { appConfig } from '../../appConfig'
import { messageType } from '../../constants/backendMessageType'

export const forgotPwdActions = {
	forgotPwd,
	reset
};

function forgotPwd(user) {
	if (!user) {
		return failed('Attempted request with no username/email')
	}
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/u/passwordReset/request", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({user})
		}).then(response => {
			// NOTE: refactor this
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {
			dispatch(success(body.user))
		}).catch(error => {
			dispatch(failed(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: forgotPwdConstants.REQUEST } }
	function success(user) { return { type: forgotPwdConstants.SUCCESS, user } }
	function failed(message) { return { type: forgotPwdConstants.FAILED, message, messageType: messageType.ERROR } }
	
}

function reset() {
	return {
		type: forgotPwdConstants.RESET
	}
}
