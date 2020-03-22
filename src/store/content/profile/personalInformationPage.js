import { reducer as personalInformationFormReducer } from 'redux-form'
import { combineReducers } from 'redux'

import { fetchData } from '../../../utils'

import { messageType } from '../../../constants/misc/backendMessageTypes'

const REQUEST_FORM_FILLED = "PERSONAL_INFORMATION_PAGE_REQUEST_FORM_FILLED"

const CONFIRM_PASSWORD_REQUEST = "PERSONAL_INFORMATION_PAGE_CONFIRM_PASSWORD_REQUEST"
const CONFIRM_PASSWORD_FAILED = "PERSONAL_INFORMATION_PAGE_CONFIRM_PASSWORD_FAILED"

const CHANGE_EMAIL_REQUEST = "PERSONAL_INFORMATION_PAGE_CHANGE_EMAIL_REQUEST"
const CHANGE_EMAIL_SUCCESS = "PERSONAL_INFORMATION_PAGE_CHANGE_EMAIL_SUCCESS"
const CHANGE_EMAIL_FAILED = "PERSONAL_INFORMATION_PAGE_CHANGE_EMAIL_FAILED"

const CHANGE_PASSWORD_REQUEST = "PERSONAL_INFORMATION_PAGE_CHANGE_PASSWORD_REQUEST"
const CHANGE_PASSWORD_SUCCESS = "PERSONAL_INFORMATION_PAGE_CHANGE_PASSWORD_SUCCESS"
const CHANGE_PASSWORD_FAILED = "PERSONAL_INFORMATION_PAGE_CHANGE_PASSWORD_FAILED"

const CHANGE_USERNAME_REQUEST = "PERSONAL_INFORMATION_PAGE_CHANGE_USERNAME_REQUEST"
const CHANGE_USERNAME_SUCCESS = "PERSONAL_INFORMATION_PAGE_CHANGE_USERNAME_SUCCESS"
const CHANGE_USERNAME_FAILED = "PERSONAL_INFORMATION_PAGE_CHANGE_USERNAME_FAILED"

const CHANGE_NAMES_REQUEST = "PERSONAL_INFORMATION_PAGE_CHANGE_NAMES_REQUEST"
const CHANGE_NAMES_SUCCESS = "PERSONAL_INFORMATION_PAGE_CHANGE_NAMES_SUCCESS"
const CHANGE_NAMES_FAILED = "PERSONAL_INFORMATION_PAGE_CHANGE_NAMES_FAILED"

const RESET = "PERSONAL_INFORMATION_PAGE_RESET"

const personalInformationPageStages = {
	SUBMITTING_FORM: 0,
	PASSWORD_CONFIRMATION: 1,
	COMPLETED: 2
}

const defaultState = {
	stage: personalInformationPageStages.SUBMITTING_FORM	
}

const defaultPwdConfirmationState = {
	stage: personalInformationPageStages.PASSWORD_CONFIRMATION,
	message:'Please confirm by entering your current password'
}

const defaultCompletionState = {
	stage: personalInformationPageStages.COMPLETED,
	message: "Waiting for server confirmation"	
}

function personalInformationPageReducer(state=defaultState, action) {
	switch (action.type) {
		case REQUEST_FORM_FILLED:
			return (['email','username','password','names'].includes(action.form)) ? {
				...defaultPwdConfirmationState,
				form: action.form,
				values: action.values
			} : {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: 'lol rly unexpected error xD'
			}
		case CONFIRM_PASSWORD_REQUEST:
			return {
				stage: personalInformationPageStages.PASSWORD_CONFIRMATION,
				message: "Waiting for server response",
				form: state.form,
				values: state.values
			}
		case CONFIRM_PASSWORD_FAILED:
			return {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: "Password confirmation failed"
			}
		case CHANGE_EMAIL_REQUEST:
			return {
				...defaultCompletionState,
				form: 'email',
				values: state.values
			}
		case CHANGE_USERNAME_REQUEST:
			return {
				...defaultCompletionState,
				form: 'username',
				values: state.values
			}
		case CHANGE_PASSWORD_REQUEST:
			return {
				...defaultCompletionState,
				form: 'password',
				values: state.values
			}
		case CHANGE_NAMES_REQUEST:
			return {
				...defaultCompletionState,
				form: 'names',
				values: state.values
			}
		case CHANGE_EMAIL_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your NEW email box',
				form: 'email',
				values: state.values
			}
		case CHANGE_USERNAME_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your email box',
				form: 'username',
				values: state.values
			}
		case CHANGE_PASSWORD_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your email box',
				form: 'password',
				values: state.values
			}
		case CHANGE_NAMES_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Name of the user changed',
				form: 'names',
				values: state.values
			}
		case CHANGE_EMAIL_FAILED:
		case CHANGE_USERNAME_FAILED:
		case CHANGE_PASSWORD_FAILED:
		case CHANGE_NAMES_FAILED:
			return {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: action.message
			}
		case RESET:
			return defaultState
		default:
			return state
	}
}

export default combineReducers({
	page: personalInformationPageReducer,
	form: personalInformationFormReducer
})

export const filled = (form, values) => ({
	type: REQUEST_FORM_FILLED,
	form,
	values
})

export const confirmPassword = (password, form, authToken) => {
	const request = () => ({ type: CONFIRM_PASSWORD_REQUEST })
	const success = (form) =>  { 
		switch(form) {
			case 'email':
				return { 
					type: CHANGE_EMAIL_REQUEST
				}
			case 'username':
				return { 
					type: CHANGE_USERNAME_REQUEST
				}
			case 'password':
				return { 
					type: CHANGE_PASSWORD_REQUEST
				}
			case 'names':
				return { 
					type: CHANGE_NAMES_REQUEST
				}
			default:
				return { 
					type: CONFIRM_PASSWORD_FAILED,
					message: 'idk wut happened, but suddenli form parameter is nul',
					messageType: messageType.ERROR
				}
		}
	}
	const failure = (message) => ({ type: CONFIRM_PASSWORD_FAILED, message, messageType: messageType.ERROR })

	return fetchData(
		"/confirmPassword",
		{
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({password})
		},
		request,
		(body) => success(form),
		failure
	)
}

export const submitEmailChange = (newEmail, authToken) => {
	const request =	 () => ({ type: CHANGE_EMAIL_REQUEST })
	const success =	 () => ({ type: CHANGE_EMAIL_SUCCESS})
	const failure =	 (message) => ({ type: CHANGE_EMAIL_FAILED, message, messageType: messageType.ERROR })
	
	return fetchData(
		"/u/emailChange",
		{
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({newEmail})
		},
		request,
		success,
		failure
	)
	
}

export const submitUsernameChange = (newUsername, authToken) => {
	const request = () => ({ type: CHANGE_USERNAME_REQUEST })
	const success = () => ({ type: CHANGE_USERNAME_SUCCESS})
	const failure = (message) => ({ type: CHANGE_USERNAME_FAILED, message, messageType: messageType.ERROR })
	return fetchData(
		"/u/usernameChange",
		{
			method: 'POST',
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + authToken
			},
			body: JSON.stringify({newUsername})
		},
		request,
		success,
		failure	
	)
}

export const submitNamesChange = (newFirstName, newLastName, authToken) => {
	const request = () => ({ type: CHANGE_NAMES_REQUEST })
	const success = () => ({ type: CHANGE_NAMES_SUCCESS})
	const failure = (message) => ({ type: CHANGE_NAMES_FAILED, message, messageType: messageType.ERROR })
	return fetchData(
		"/u/namesChange",
		{
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + authToken
		},
		request,
		success,
		failure
	)
}

export const submitPasswordChange = (user) => {
	
	const request = ()  => ({ type: CHANGE_PASSWORD_REQUEST })
	const success = (user) => ({ type: CHANGE_PASSWORD_SUCCESS, user})
	const failure = (message) => ({ type: CHANGE_PASSWORD_FAILED, message, messageType: messageType.ERROR })
	if (!user) {
		return failure('Attempted request with no username/email')
	}
	return fetchData(
		"/u/passwordReset/request",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({user})
		},
		request,
		({user}) => success(user),
		failure	
	)
}


export const reset = () => ({
	type: RESET
})
