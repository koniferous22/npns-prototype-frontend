import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { personalInformationPageStages, personalInformationPageConstants } from '../../../constants/content/profile/personalInformationPage'

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
		case personalInformationPageConstants.REQUEST_FORM_FILLED:
			return (['email','username','password','names'].includes(action.form)) ? {
				...defaultPwdConfirmationState,
				form: action.form,
				values: action.values
			} : {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: 'lol rly unexpected error xD'
			}
		case personalInformationPageConstants.CONFIRM_PASSWORD_REQUEST:
			return {
				stage: personalInformationPageStages.PASSWORD_CONFIRMATION,
				message: "Waiting for server response",
				form: state.form,
				values: state.values
			}
		case personalInformationPageConstants.CONFIRM_PASSWORD_FAILED:
			return {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: "Password confirmation failed"
			}
		case personalInformationPageConstants.CHANGE_EMAIL_REQUEST:
			return {
				...defaultCompletionState,
				form: 'email',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_USERNAME_REQUEST:
			return {
				...defaultCompletionState,
				form: 'username',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_PASSWORD_REQUEST:
			return {
				...defaultCompletionState,
				form: 'password',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_NAMES_REQUEST:
			return {
				...defaultCompletionState,
				form: 'names',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_EMAIL_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your NEW email box',
				form: 'email',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_USERNAME_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your email box',
				form: 'username',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_PASSWORD_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your email box',
				form: 'password',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_NAMES_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Name of the user changed',
				form: 'names',
				values: state.values
			}
		case personalInformationPageConstants.CHANGE_EMAIL_FAILED:
		case personalInformationPageConstants.CHANGE_USERNAME_FAILED:
		case personalInformationPageConstants.CHANGE_PASSWORD_FAILED:
		case personalInformationPageConstants.CHANGE_NAMES_FAILED:
			return {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: action.message
			}
		default:
			return state
	}
}

const personalInformationFormReducer = reducer

export default combineReducers({
	page: personalInformationPageReducer,
	form: personalInformationFormReducer
})