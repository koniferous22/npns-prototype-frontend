import { reducer as formReducer } from 'redux-form'
import { combineReducers } from 'redux'

import { appConfig } from '../../appConfig'

import { messageType } from '../../constants/misc/backendMessageTypes'
import { fetchData } from '../../utils'


const REQUEST = "FORGOT_PWD_PAGE_REQUEST"
const SUCCESS = "FORGOT_PWD_PAGE_SUCCESS"
const FAILED = "FORGOT_PWD_PAGE_FAILURE"
const RESET = "FORGOT_PWD_PAGE_RESET"

const forgotPwdStages = {
	SUBMITTING_FORM: 0,
	EMAIL_SENT: 1
}

const defaultState = {
	stage: forgotPwdStages.SUBMITTING_FORM
}

function forgotPwdPageReducer(state = defaultState, action) {
	switch (action.type) {
		case REQUEST:
			return {
				stage: forgotPwdStages.SUBMITTING_FORM,
				message: "Waiting for server response",
				messageType: action.messageType
			}
		case SUCCESS:
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
		case FAILED:
			return {
				stage: forgotPwdStages.SUBMITTING_FORM,
				message: action.message,
				messageType: action.messageType
			}
		case RESET:
			return defaultState
		default:
			return state
	}
}

export default combineReducers({
	page: forgotPwdPageReducer,
	form: formReducer
})


export const forgotPwd = (user) => {
	const request = () => ({ type: REQUEST })
	const success = (user) => ({ type: SUCCESS, user })
	const failed = (message) => ({ type: FAILED, message, messageType: messageType.ERROR })

	if (!user) {
		return failed('Attempted request with no username/email')
	}

	fetchData(
		'/u/passwordReset/request',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({user})
		},
		request,
		({ user }) => success(user),
		(error) => failed(JSON.stringify(error))
	)
}
