import { appConfig } from '../../appConfig'
import { boostConstants } from '../../constants/content/boost'
import { messageType } from '../../constants/backendMessageType'

export const boostActions = {
	boost,
	reset
};

function boost(boost, authToken) {
	return dispatch => {
		dispatch(request(boost));

		fetch(appConfig.backendUrl + "/problem/" + boost.problemId + "/boost", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
			body: JSON.stringify(boost)
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
	function failure(error) { return { type: boostConstants.FAILED, error, messageType: messageType.ERROR } }
}

function reset() {
	return {
		type: boostConstants.RESET
	}
}
