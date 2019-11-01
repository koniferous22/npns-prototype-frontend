import { combineReducers } from 'redux'
import { reducer } from 'redux-form'

import { submitProblemPageConstants, submitProblemStages } from '../../constants/content/submitProblemPage'


const initialState = {
  stage: submitProblemStages.SUBMITTING_PROBLEM
}

const submitProblemPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case submitProblemPageConstants.REQUEST:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: "Waiting for server response"}
		case submitProblemPageConstants.SUCCESS:
			return {stage: submitProblemStages.COMPLETED, problemId: action.problem.id,	message: "Problem submitted"}
		case submitProblemPageConstants.FAILED:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: action.error}
		case submitProblemPageConstants.RESET:
			return initialState
		default:
			return state
	}
}

const submitProblemFormReducer = reducer

export default combineReducers({
	page: submitProblemPageReducer,
	form: submitProblemFormReducer
})
