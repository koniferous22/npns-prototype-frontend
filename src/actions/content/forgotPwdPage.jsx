import { forgotPwdConstants } from '../../constants/content/forgotPwdPage';
import { appConfig } from '../../appConfig'

export const forgotPwdActions = {
	forgotPwd,
	reset
};

function forgotPwd(user) {
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/passwordReset", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
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
		.then(user => {
			dispatch(success(user))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: forgotPwdConstants.REQUEST } }
	function success({user}) { return { type: forgotPwdConstants.SUCCESS, user } }
	function failure(message) { return { type: forgotPwdConstants.FAILED, message } }
	
}

function reset() {
	return {
		type: forgotPwdConstants.RESET
	}
}