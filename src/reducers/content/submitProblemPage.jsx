import { combineReducers } from 'redux'
import { reducer } from 'redux-form'

import { submitProblemPageConstants, submitProblemStages } from '../../constants/content/submitProblemPage'


const initialState = {
	stage: submitProblemStages.SUBMITTING_PROBLEM,
	queueOptions: []
}

const submitProblemPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case submitProblemPageConstants.SUBMIT_REQUEST:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: "Waiting for server response", messageType: action.messageType, queueOptions: state.queues}
		case submitProblemPageConstants.SUBMIT_SUCCESS:
			return {stage: submitProblemStages.COMPLETED, problemId: action.problem.id,	message: "Problem submitted", messageType: action.messageType, queueOptions: state.queues, queue: action.queue}
		case submitProblemPageConstants.SUBMIT_FAILED:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: action.error, messageType: action.messageType, queueOptions: state.queues}
		case submitProblemPageConstants.LOAD_QUEUES_REQUEST:
			return {stage: state.stage, message: "Waiting for server response", messageType: action.messageType, queueOptions: state.queues}
		case submitProblemPageConstants.LOAD_QUEUES_SUCCESS:
			return {stage: state.stage, queueOptions: action.queues}
		case submitProblemPageConstants.LOAD_QUEUES_FAILED:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: action.error, messageType: action.messageType, queueOptions: state.queues}
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
