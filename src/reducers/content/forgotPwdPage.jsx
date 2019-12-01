import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { forgotPwdConstants, forgotPwdStages } from '../../constants/content/forgotPwdPage'

import { appConfig } from '../../appConfig'

const defaultState = {
	stage: forgotPwdStages.SUBMITTING_FORM
}

const forgotPwdPageReducer = (state = defaultState, action) =>  {
	switch (action.type) {
		case forgotPwdConstants.REQUEST:
			return {
				stage: forgotPwdStages.SUBMITTING_FORM,
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case forgotPwdConstants.SUCCESS:
			return {
				stage: forgotPwdStages.EMAIL_SENT,
				message: {
					message: appConfig.productionMail ? "YUH! check ur emeil adres, thereee should be an confermation link for pwd reset, so u dont have to regooster again. To do so follow these steps" : "Hello, this is just a demo, which doesn't use real smtp server - testing email service is used instead. That means, to complete the process",
					steps: appConfig.productionMail ? [
						"Open your favourite email @gmail.biz",
						"Click the email you just received",
						"click the link",
						"PROFIT"
					] : [
						"go to \"https://ethereal.email\"",
						"log in with following credentials:\n\tusername: \"oren.cremin@ethereal.email\"\n\tpassword:\"86GXzmB8sDN2u2Ycuy\"",
						"in section messages should be your email, i.e. addressed to \"" + action.user.username + "\" with email adress \"" + action.user.email + "\""
					]
				},
				messageType: action.messageType
			}
		case forgotPwdConstants.FAILED:
			return {
				stage: forgotPwdStages.SUBMITTING_FORM,
				message: action.message,
				messageType: action.messageType
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
