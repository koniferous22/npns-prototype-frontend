import { combineReducers } from 'redux'
import { reducer } from 'redux-form'

import { submitProblemPageConstants, submitProblemStages } from '../../constants/content/submitProblemPage'


const initialState = {
  stage: submitProblemStages.SUBMITTING_PROBLEM
}

const submitProblemPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case submitProblemPageConstants.SUBMIT_PROBLEM_REQUEST:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: "Waiting for server response"}
		case submitProblemPageConstants.SUBMIT_PROBLEM_SUCCESS:
			return {stage: submitProblemStages.COMPLETED,	message: "Problem submitted"}
		case submitProblemPageConstants.SUBMIT_PROBLEM_FAILED:
				return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: action.error}
		default:
			return state
	}
}

const submitProblemFormReducer = reducer

export default combineReducers({
	page: submitProblemPageReducer,
	form: submitProblemFormReducer
})
