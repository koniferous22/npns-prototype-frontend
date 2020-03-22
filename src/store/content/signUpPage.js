import { reducer as signupFormReducer } from 'redux-form'
import { combineReducers } from 'redux'

const REQUEST = 'SIGNUP_REQUEST'
const SUCCESS = 'SIGNUP_SUCCESS'
const FAILED = 'SIGNUP_FAILED'
const RESET = 'SIGNUP_PAGE_RESET'

const signupStages = {
	SUBMITTING_FORM: 0,
	COMPLETED: 1
}

const signupPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case signupConstants.REQUEST:
			return {stage: signupStages.SUBMITTING_FORM, message: "Waiting for server response"}
		case signupConstants.SUCCESS:
			return {
				stage: signupStages.COMPLETED,
				message: {
					message: appConfig.productionMail ? "Confermation link sent ;) pls check ur email adress, YUH!" : "Ok now that you've regoostered, this is a demo version that uses only testing mail service for user receiving emails, since we cannot afford SMTP server.\nThat means, to complete the process",
					steps: appConfig.productionMail ? [] : [
						"go to \"https://ethereal.email\"",
						"log in with following credentials:\n\tusername=\"oren.cremin@ethereal.email\",\n\tpassword=\"86GXzmB8sDN2u2Ycuy\"",
						"in section messages should be your email, i.e. addressed to \"" + action.user.username + "\" with email adress \"" + action.user.email + "\""
					]
				},
				messageType: action.messageType
			}
		case signupConstants.FAILED:
				return {stage: signupStages.SUBMITTING_FORM, message: action.message, messageType: action.messageType }
		case signupConstants.RESET:
			return initialState
		default:
			return state
	}
}

export default combineReducers({
	page: signupPageReducer,
	form: signupFormReducer
})

export const signup = (user) => {
	function request() { return { type: signupConstants.REQUEST } }
	function success({user}) { return { type: signupConstants.SUCCESS, user } }
	function failure(message) { return { type: signupConstants.FAILED, message, messageType: messageType.ERROR } }

	return fetchData(
		"/signup",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(user)
		},
		request,
		success,
		failure
	)	
}

// this const should match the const in SignUp Form
const availableFields = ['username', 'password', 'email', 'referred_by']

export const validateField = (values, field) => {
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

export const reset = () => ({
	type: signupConstants.RESET
})
