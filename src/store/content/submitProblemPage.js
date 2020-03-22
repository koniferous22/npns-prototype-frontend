import { combineReducers } from 'redux'
import { reducer as submitProblemFormReducer } from 'redux-form'

import { messageType } from '../../constants/misc/backendMessageTypes'

import { fetchData } from '../../utils'

const SUBMIT_REQUEST = 'SUBMIT_PROBLEM_PAGE_SUBMIT_REQUEST'
const SUBMIT_SUCCESS = 'SUBMIT_PROBLEM_PAGE_SUBMIT_SUCCESS'
const SUBMIT_FAILED = 'SUBMIT_PROBLEM_PAGE_SUBMIT_FAILED'

const LOAD_QUEUES_REQUEST = 'SUBMIT_PROBLEM_PAGE_LOAD_QUEUES_REQUEST'
const LOAD_QUEUES_SUCCESS = 'SUBMIT_PROBLEM_PAGE_LOAD_QUEUES_SUCCESS'
const LOAD_QUEUES_FAILED = 'SUBMIT_PROBLEM_PAGE_LOAD_QUEUES_FAILED'	

const RESET = 'SUBMIT_PROBLEM_PAGE_RESET'

const submitProblemStages = {
  SUBMITTING_PROBLEM: 0,
  COMPLETED: 1
}


const initialState = {
	stage: submitProblemStages.SUBMITTING_PROBLEM,
	queueOptions: []
}

function submitProblemPageReducer(state = initialState, action) {
	switch (action.type) {
		case SUBMIT_REQUEST:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: "Waiting for server response", messageType: action.messageType, queueOptions: state.queues}
		case SUBMIT_SUCCESS:
			return {stage: submitProblemStages.COMPLETED, problemId: action.problem.id,	message: "Problem submitted", messageType: action.messageType, queueOptions: state.queues, queue: action.queue}
		case SUBMIT_FAILED:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: action.error, messageType: action.messageType, queueOptions: state.queues}
		case LOAD_QUEUES_REQUEST:
			return {stage: state.stage, message: "Waiting for server response", messageType: action.messageType, queueOptions: state.queues}
		case LOAD_QUEUES_SUCCESS:
			return {stage: state.stage, queueOptions: action.queues}
		case LOAD_QUEUES_FAILED:
			return {stage: submitProblemStages.SUBMITTING_PROBLEM, message: action.error, messageType: action.messageType, queueOptions: state.queues}
		case RESET:
			return initialState
		default:
			return state
	}
}

export default combineReducers({
	page: submitProblemPageReducer,
	form: submitProblemFormReducer
})

export const submit = (problem, authToken) => {
	const request = () => ({ type: SUBMIT_REQUEST })
	const success = (problem, queue) => ({ type: SUBMIT_SUCCESS, problem, queue })
	const failure = (error) => ({ type: SUBMIT_FAILED, error, messageType: messageType.ERROR })

	const queue = problem.queue_name
	return fetchData(
		"/problem/add",
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
			body: JSON.stringify(problem)
		},
		request,
		(response) => success(response, queue),
		failure
	)
}

export const fetchDropdownValues = () => {
	const request = () => ({ type: LOAD_QUEUES_REQUEST })
	const success = (queues) => ({ type: LOAD_QUEUES_SUCCESS, queues })
	const failure = (error) => ({ type: LOAD_QUEUES_FAILED, error, messageType: messageType.ERROR })

	return fetchData(
		"/queue/all",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		},
		request,
		(response) => success(response.queues.map(q => q.name)),
		failure
	)
}

export const reset = () => ({
	type: RESET
})

