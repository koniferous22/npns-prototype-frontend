import { signupConstants } from '../../constants/content/signUpPage';
import { appConfig } from '../../appConfig'

export const signupActions = {
	signup,
	validateField,
	reset
};

function signup(user) {
	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/signup", {
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
	
	function request() { return { type: signupConstants.REQUEST } }
	function success({user}) { return { type: signupConstants.SUCCESS, user } }
	function failure(message) { return { type: signupConstants.FAILED, message } }
	
}

// this const should match the const in SignUp Form
const availableFields = ['username', 'password', 'email']

function validateField(values, field) {
	if (!field) {
		return new Promise(resolve => resolve())
	}
	if (!availableFields.includes(field)) {
		return new Promise((resolve, reject) => reject({[field]: 'Invalid field'}))
	}
	return new Promise((resolve, reject) => {
		fetch(appConfig.backendUrl + "/valid/" + field, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({[field]: values[field]})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return resolve()
			}
			return response.json().then(data => {
				return reject({[field]: data.message})
			})
		})
	}) 
}

function reset() {
	return {
		type: signupConstants.RESET
	}
}