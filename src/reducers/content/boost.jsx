import { combineReducers } from 'redux'
import { reducer } from 'redux-form'

import { boostConstants, boostStages } from '../../constants/content/boost'

const initialState = {
  stage: boostStages.BOOSTING
}

const boostPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case boostConstants.SUBMIT_BOOST_REQUEST:
			return {stage: boostStages.BOOSTING, message: "Waiting for response"}
		case boostConstants.ADJUST_BOOST_REQUEST:
			return {message: "Waiting for response"}
		case boostConstants.SUBMIT_BOOST_SUCCESS:
			return {stage: boostStages.PAYPAL, message: "Boost value submitted", messageType: action.messageType, boostValue: action.boostValue}
		case boostConstants.ADJUST_BOOST_SUCCESS:
			return {messageType: action.messageType, boostValue: action.boostValue}
		case boostConstants.PAYPAL_SUCCESS:
			return {stage: boostStages.COMPLETED, message: "Problem boosted", messageType: action.messageType, boost: action.boost}
		case boostConstants.FAILED:
			return {stage: boostStages.BOOSTING, message: action.error, messageType: action.messageType}
		case boostConstants.RESET:
			return initialState
		default:
			return state
	}
}

const boostFormReducer = reducer

export default combineReducers({
	page: boostPageReducer,
	form: boostFormReducer
})
