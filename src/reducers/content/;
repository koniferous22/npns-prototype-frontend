import { submitProblemPageConstants } from '../../constants/content/submitProblemPage'

const defaultState = {}

const submitProblemPageReducer = (state = defaultState, action) => {
	switch (action.type) {
		case submitProblemPageConstants.SUBMIT_PROBLEM_REQUEST:
			return {message: "Waiting for server response"}
		case submitProblemPageConstants.SUBMIT_PROBLEM_SUCCESS:
			return {message: "Problem submitted"}
		case submitProblemPageConstants.SUBMIT_PROBLEM_FAILED:
				return {message: action.error}
		default:
			return state
	}
}

export default submitProblemPageReducer
