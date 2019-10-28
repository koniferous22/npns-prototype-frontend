import { appConfig } from '../../../appConfig'
import { personalInformationPageConstants } from '../../../constants/content/profile/personalInformationPage'

import { forgotPwdActions } from '../forgotPwdPage'

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
					message: 'idk wut happened, but suddenli form parameter is nul'
				}
		}
	}
	function failure(message) { return { type: personalInformationPageConstants.CONFIRM_PASSWORD_FAILED, message } }
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
	function failure(message) { return { type: personalInformationPageConstants.CHANGE_EMAIL_FAILED, message } }
	
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
	function failure(message) { return { type: personalInformationPageConstants.CHANGE_USERNAME_FAILED, message } }
	
}

const submitPasswordChange = (user) => forgotPwdActions.forgotPwd(user)

/*
* submit change username
* remaining data: first name, last name
*/

export const personalInformationPageActions = {
	filled,
	confirmPassword,
	submitEmailChange,
	submitUsernameChange,
	submitPasswordChange	
}