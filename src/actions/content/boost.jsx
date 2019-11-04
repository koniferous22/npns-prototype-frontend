import { appConfig } from '../../appConfig'
import { boostConstants } from '../../constants/content/boost';

export const boostActions = {
	boost,
	reset
};

function boost(value, problemId, authToken) {
	return dispatch => {
		dispatch(request(value));

		fetch(appConfig.backendUrl + "/problem/" + problemId + "/boost", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
			body: JSON.stringify(value)
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(value => {
			dispatch(success())
		}).catch(error => {
			dispatch(failure(error))
		})
	}
	
	function request() { return { type: boostConstants.REQUEST } }
	function success() { return { type: boostConstants.SUCCESS } }
	function failure(error) { return { type: boostConstants.FAILED, error } }
}

function reset() {
	return {
		type: boostConstants.RESET
	}
}
