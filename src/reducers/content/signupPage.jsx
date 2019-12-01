import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { signupConstants, signupStages } from '../../constants/content/signUpPage'

import { appConfig } from '../../appConfig'

const initialState = {
	stage: signupStages.SUBMITTING_FORM
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


const signupFormReducer = reducer;

export default combineReducers({
	page: signupPageReducer,
	form: signupFormReducer
})
