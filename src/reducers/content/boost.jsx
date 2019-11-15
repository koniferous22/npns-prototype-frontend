import { combineReducers } from 'redux'
import { reducer } from 'redux-form'

import { boostConstants, boostStages } from '../../constants/content/boost'


const initialState = {
  stage: boostStages.BOOSTING
}

const boostPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case boostConstants.REQUEST:
			return {stage: boostStages.BOOSTING, message: "Waiting for server response"}
		case boostConstants.SUCCESS:
			return {stage: boostStages.COMPLETED, message: "Problem boosted", messageType: action.messageType}
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
