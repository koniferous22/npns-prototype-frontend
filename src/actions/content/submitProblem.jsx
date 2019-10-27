import { appConfig } from '../../appConfig'
import { submitProblemPageConstants } from '../../constants/content/submitProblemPage';

export const submitProblemActions = {
	submit
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
	
	function request() { return { type: submitProblemPageConstants.SUBMIT_PROBLEM_REQUEST } }
	function success(problem) { return { type: submitProblemPageConstants.SUBMIT_PROBLEM_SUCCESS, problem } }
	function failure(error) { return { type: submitProblemPageConstants.SUBMIT_PROBLEM_FAILED, error } }
}
