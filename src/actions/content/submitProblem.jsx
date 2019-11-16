import { appConfig } from '../../appConfig'
import { submitProblemPageConstants } from '../../constants/content/submitProblemPage'
import { messageType } from '../../constants/misc/backendMessageTypes'

function submit(problem, authToken) {
	
	return dispatch => {
		dispatch(request(problem));
		const queue = problem.queue_name
		fetch(appConfig.backendUrl + "/problem/add", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
			body: JSON.stringify(problem)
		}).then(response => {
			// NOTE: refactor this my friend
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(problem => {
			dispatch(success(problem, queue))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
	
	function request() { return { type: submitProblemPageConstants.SUBMIT_REQUEST } }
	function success(problem, queue) { return { type: submitProblemPageConstants.SUBMIT_SUCCESS, problem, queue } }
	function failure(error) { return { type: submitProblemPageConstants.SUBMIT_FAILED, error, messageType: messageType.ERROR } }
}

function fetchDropdownValues() {

	function request() { return { type: submitProblemPageConstants.LOAD_QUEUES_REQUEST } }
	function success(queues) { return { type: submitProblemPageConstants.LOAD_QUEUES_SUCCESS, queues } }
	function failure(error) { return { type: submitProblemPageConstants.LOAD_QUEUES_FAILED, error, messageType: messageType.ERROR } }

	return dispatch => {
		dispatch(request());

		fetch(appConfig.backendUrl + "/queue/all", {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {
			dispatch(success(body.queues.map(q => q.name)))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
}

function reset() {
	return {
		type: submitProblemPageConstants.RESET
	}
}

export const submitProblemActions = {
	submit,
	fetchDropdownValues,
	reset
};
