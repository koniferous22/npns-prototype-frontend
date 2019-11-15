import { appConfig } from '../../../appConfig'
import { personalInformationPageConstants } from '../../../constants/content/profile/personalInformationPage'
import { messageType } from '../../../constants/backendMessageType'

function filled(form, values) {
	return {
		type: personalInformationPageConstants.REQUEST_FORM_FILLED,
		form,
		values
	}
}

function confirmPassword(password, form, authToken) {
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/confirmPassword", {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({password})
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
		.then(res => {
			dispatch(success(form))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: personalInformationPageConstants.CONFIRM_PASSWORD_REQUEST } }
	function success(form) { 
		switch(form) {
			case 'email':
				return { 
					type: personalInformationPageConstants.CHANGE_EMAIL_REQUEST
				}
			case 'username':
				return { 
					type: personalInformationPageConstants.CHANGE_USERNAME_REQUEST
				}
			case 'password':
				return { 
					type: personalInformationPageConstants.CHANGE_PASSWORD_REQUEST
				}
			case 'names':
				return { 
					type: personalInformationPageConstants.CHANGE_NAMES_REQUEST
				}
			default:
				return { 
					type: personalInformationPageConstants.CONFIRM_PASSWORD_FAILED,
					message: 'idk wut happened, but suddenli form parameter is nul',
					messageType: messageType.ERROR
				}
		}
	}
	function failure(message) { return { type: personalInformationPageConstants.CONFIRM_PASSWORD_FAILED, message, messageType: messageType.ERROR } }
}


function submitEmailChange(newEmail, authToken) {
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/u/emailChange", {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({newEmail})
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
			dispatch(success())
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: personalInformationPageConstants.CHANGE_EMAIL_REQUEST } }
	function success() { return { type: personalInformationPageConstants.CHANGE_EMAIL_SUCCESS} }
	function failure(message) { return { type: personalInformationPageConstants.CHANGE_EMAIL_FAILED, message, messageType: messageType.ERROR } }
	
}

function submitUsernameChange(newUsername, authToken) {
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/u/usernameChange", {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({newUsername})
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
			dispatch(success())
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: personalInformationPageConstants.CHANGE_USERNAME_REQUEST } }
	function success() { return { type: personalInformationPageConstants.CHANGE_USERNAME_SUCCESS} }
	function failure(message) { return { type: personalInformationPageConstants.CHANGE_USERNAME_FAILED, message, messageType: messageType.ERROR } }
	
}

function submitNamesChange(newFirstName, newLastName, authToken) {
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/u/namesChange", {
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({newFirstName, newLastName})
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
			dispatch(success())
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: personalInformationPageConstants.CHANGE_NAMES_REQUEST } }
	function success() { return { type: personalInformationPageConstants.CHANGE_NAMES_SUCCESS} }
	function failure(message) { return { type: personalInformationPageConstants.CHANGE_NAMES_FAILED, message, messageType: messageType.ERROR } }
	
}

function submitPasswordChange(user) {
	if (!user) {
		return failure('Attempted request with no username/email')
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
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: personalInformationPageConstants.CHANGE_PASSWORD_REQUEST } }
	function success(user) { return { type: personalInformationPageConstants.CHANGE_PASSWORD_SUCCESS, user} }
	function failure(message) { return { type: personalInformationPageConstants.CHANGE_PASSWORD_FAILED, message, messageType: messageType.ERROR } }
}


function reset() {
	return {
		type: personalInformationPageConstants.RESET
	}
}

export const personalInformationPageActions = {
	filled,
	confirmPassword,
	submitEmailChange,
	submitUsernameChange,
	submitNamesChange,
	submitPasswordChange,
	reset
}
