import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { signupConstants, signupStages } from '../../constants/content/signUpPage'

const initialState = {
	stage: signupStages.SUBMITTING_FORM
}



const signupPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case signupConstants.REQUEST:
			return {stage: signupStages.SUBMITTING_FORM, message: "Waiting for server response"}
		case signupConstants.SUCCESS:
			return {stage: signupStages.COMPLETED, message:" Ok now that you've regoostered, this is a demo version that uses only testing mail service for user receiving emails, since we cannot afford SMTP server\n\
			that means, to complete the process\n\
			1. go to \"https://ethereal.email\"\n\
			2. log in with following credentials:\n\tusername: \"oren.cremin@ethereal.email\"\n\tpassword:\"86GXzmB8sDN2u2Ycuy\"\n\
			3. in section messages should be your email, i.e. addressed to \"" + action.user.username + "\" with email adress \"" + action.user.email + "\"\n\
			"}
		case signupConstants.FAILED:
				return {stage: signupStages.SUBMITTING_FORM, message: action.message}
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
