import { appConfig } from '../../appConfig'
import { boostConstants } from '../../constants/content/boost'
import { messageType } from '../../constants/misc/backendMessageTypes'

export const boostActions = {
	submitBoost,
	adjustBoost,
	savePaypalOrder,
	reset
};

function submitBoost(boostValue) {
	return dispatch => {
		dispatch(request());
		dispatch(success(boostValue));
	}
	
	function request() { return { type: boostConstants.SUBMIT_BOOST_REQUEST } }
	function success(boostValue) { return { type: boostConstants.SUBMIT_BOOST_SUCCESS, boostValue } }
}

function adjustBoost(boostValue) {
	return dispatch => {
		dispatch(request());
		dispatch(success(boostValue));
	}
	
	function request() { return { type: boostConstants.ADJUST_BOOST_REQUEST } }
	function success(boostValue) { return { type: boostConstants.ADJUST_BOOST_SUCCESS, boostValue } }
}


function savePaypalOrder(boost, authToken) {
	return dispatch => {
		dispatch(request());
		dispatch(success());

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
			dispatch(failure(JSON.stringify(error)))
		})
	}
	
	function request() { return { type: boostConstants.PAYPAL_REQUEST } }
	function success() { return { type: boostConstants.PAYPAL_SUCCESS } }
	function failure(error) { return { type: boostConstants.FAILED, error, messageType: messageType.ERROR } }
}


function reset() {
	return {
		type: boostConstants.RESET
	}
}
