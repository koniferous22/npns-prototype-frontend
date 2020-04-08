import { appConfig } from '../../appConfig'

import { fetchData, messageType } from '../../utils'
import { reducer as signupFormReducer } from 'redux-form'
import { combineReducers } from 'redux'

const REQUEST = 'SIGNUP_REQUEST'
const SUCCESS = 'SIGNUP_SUCCESS'
const FAILED = 'SIGNUP_FAILED'
const RESET = 'SIGNUP_PAGE_RESET'

export const signUpStages = {
	SUBMITTING_FORM: 0,
	COMPLETED: 1
}

const initialState = {
	stage: signUpStages.SUBMITTING_FORM
}


const signupPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case REQUEST:
			return {stage: signUpStages.SUBMITTING_FORM, message: "Waiting for server response"}
		case SUCCESS:
			return {
				stage: signUpStages.COMPLETED,
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
		case FAILED:
				return {stage: signUpStages.SUBMITTING_FORM, message: action.message, messageType: action.messageType }
		case RESET:
			return initialState
		default:
			return state
	}
}

const validationReducer = (state={}, action) => {
	switch (action.type) {
		case REQUEST:
			return { message: "Waiting for server response" }
		case SUCCESS:
			return { message: "Lulz", messageType: action.messageType }
		case FAILED:
				return { body: action.body, message: action.message, messageType: action.messageType }
		default:
			return state
	}
}

export default combineReducers({
	page: signupPageReducer,
	form: signupFormReducer,
	validation: validationReducer
})

export const signup = (user) => {
	function request() { return { type: REQUEST } }
	function success({user}) { return { type: SUCCESS, user } }
	function failure(message) { return { type: FAILED, message, messageType: messageType.ERROR } }

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

export const validate = (values, field) => {
	console.log(values, field)
	if (!field) {
		console.log('!field')
		return {}
	}
	if (!availableFields.includes(field)) {
		console.log('!availableFields.includes(field)')
		return {[field]: 'Invalid field'}
	}

	const body = {[field]: values[field]}
	console.log(body)

	function request() { return { type: REQUEST } }
	function success(kkt) { return { type: SUCCESS, kkt } }
	function failure(message, body) { return { type: FAILED, body, message, messageType: messageType.ERROR } }
	
	console.log('odtialto nizsie to uz nefachci lulz')
	return fetchData(
		"/valid/" + field,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body)
		},
		request,
		success,
		failure
	)	
}


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
				console.log('KOKOT')
				console.log(resolve())
				return resolve()
			}
			return response.json().then(data => {
				console.log('PICA')
				console.log({[field]: data.message})
				return reject({[field]: data.message})
			})
		})
	})
}

export const reset = () => ({
	type: RESET
})
