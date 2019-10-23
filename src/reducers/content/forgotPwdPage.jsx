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
				stage: forgotPwdStages.EMAIL_SENT
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