import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { forgotPwdConstants, forgotPwdStages } from '../../constants/content/forgotPwdPage'

const defaultState = {
	stage: forgotPwdStages.SUBMITTING_FORM
}

const forgotPwdPageReducer = (state = defaultState, action) =>  {
	switch (action.type) {
		case forgotPwdConstants.REQUEST:
			return {
				stage: forgotPwdStages.SUBMITTING_FORM,
				message: "Waiting for server response"
			}
		case forgotPwdConstants.SUCCESS:
			return {
				stage: forgotPwdStages.EMAIL_SENT,
				message: "Hello, this is just a demo, which doesn't use real smtp server - testing email service is used instead\n\
					that means, to complete the process\n\
					1. go to \"https://ethereal.email\"\n\
					2. log in with following credentials:\n\tusername: \"oren.cremin@ethereal.email\"\n\tpassword:\"86GXzmB8sDN2u2Ycuy\"\n\
					3. in section messages should be your email, i.e. addressed to \"" + action.user.username + "\" with email adress \"" + action.user.email + "\"\n\
					"
			}
		case forgotPwdConstants.FAILED:
			return {
				stage: forgotPwdStages.SUBMITTING_FORM,
				message: action.message
			}
		case forgotPwdConstants.RESET:
			return defaultState
		default:
			return state
	}
}

const forgotPwdFormReducer = reducer

export default combineReducers({
	page: forgotPwdPageReducer,
	form: forgotPwdFormReducer
})