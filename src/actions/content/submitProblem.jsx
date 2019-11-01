import { appConfig } from '../../appConfig'
import { submitProblemPageConstants } from '../../constants/content/submitProblemPage';

export const submitProblemActions = {
	submit,
	reset
};

function submit(problem, authToken) {
	
	return dispatch => {
		dispatch(request(problem));

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
			dispatch(success(problem))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
	
	function request() { return { type: submitProblemPageConstants.REQUEST } }
	function success(problem) { return { type: submitProblemPageConstants.SUCCESS, problem } }
	function failure(error) { return { type: submitProblemPageConstants.FAILED, error } }
}

function reset() {
	return {
		type: submitProblemPageConstants.RESET
	}
}
