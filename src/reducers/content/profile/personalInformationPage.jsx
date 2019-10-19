import { personalInformationPageStages, personalInformationPageConstants }

const defaultState = {
	stage: personalInformationPageStages.SUBMITTING_FORM	
}

const defaultPwdConfirmationState = {
	state: personalInformationPageStages.PASSWORD_CONFIRMATION,
	message:'Please confirm by entering your current password'
}

const defaultCompletionState = {
	stage: personalInformationPageStages.COMPLETED,
	message: "Waiting for server confirmation"	
}

function personalInformationPageReducer(state=defaultState, action) {
	switch (action.type) {
		case personalInformationPageConstants.FORM_VERIFYING_EMAIL_REQUEST:
			return {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: 'Verifying Email',
				form: 'email'
			}
		case personalInformationPageConstants.FORM_VERIFYING_USERNAME_REQUEST:
			return {
				state: personalInformationPageStages.SUBMITTING_FORM,
				message: 'Verifying new username',
				form: 'username'
			}
		case personalInformationPageConstants.FORM_VERIFYING_EMAIL_SUCCESS:
			return {
				...defaultPwdConfirmationState,
				form:'email'
			}
		case personalInformationPageConstants.FORM_VERIFYING_USERNAME_SUCCESS:
			return {
				...defaultPwdConfirmationState,
				form:'username'
			}
		case personalInformationPageConstants.FORM_VERIFYING_PASSWORD_SUCCESS:
			return {
				...defaultPwdConfirmationState,
				form:'password'
			}
		case personalInformationPageConstants.FORM_VERIFYING_NAMES_SUCCESS:
			return {
				...defaultPwdConfirmationState,
				form: 'names'
			}
		case personalInformationPageConstants.CONFIRM_PASSWORD_REQUEST:
			return {
				state: personalInformationPageStages.PASSWORD_CONFIRMATION,
				message: "Waiting for server response"
			}
		case personalInformationPageConstants.CONFIRM_PASSWORD_FAILED:
			return {
				stage: personalInformationPageStages.SUBMITTING_FORM,
				message: "Password confirmation failed"
			}
		case personalInformationPageConstants.CHANGE_EMAIL_REQUEST:
			return {
				...defaultCompletionState,
				form: 'email'
			}
		case personalInformationPageConstants.CHANGE_USERNAME_REQUEST:
			return {
				...defaultCompletionState,
				form: 'username'		
			}
		case personalInformationPageConstants.CHANGE_PASSWORD_REQUEST:
			return {
				...defaultCompletionState,
				form: 'password'
			}
		case personalInformationPageConstants.CHANGE_NAMES_REQUEST:
			return {
				...defaultCompletionState,
				form: 'names'
			}
		case personalInformationPageConstants.CHANGE_EMAIL_SUCCESS:
		case personalInformationPageConstants.CHANGE_USERNAME_SUCCESS:
		case personalInformationPageConstants.CHANGE_PASSWORD_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Changes submitted, check your email box'
			}
		case personalInformationPageConstants.CHANGE_NAMES_SUCCESS:
			return {
				...defaultCompletionState,
				message: 'Name of the user changed'
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