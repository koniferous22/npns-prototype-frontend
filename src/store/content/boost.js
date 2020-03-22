import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import { appConfig } from '../../appConfig'
import { messageType } from '../../constants/misc/backendMessageTypes'
import { fetchData } from '../../utils'

const SUBMIT_BOOST = 'BOOST_PAGE_SUBMIT_BOOST'
const ADJUST_BOOST = 'BOOST_PAGE_ADJUST_BOOST'
const PAYPAL_REQUEST = 'BOOST_PAGE_PAYPAL_REQUEST'
const PAYPAL_SUCCESS = 'BOOST_PAGE_PAYPAL_SUCCESS'
const PAYPAL_FAILED = 'BOOST_PAGE_ADJUST_BOOST_FAILED'
const RESET = 'BOOST_PAGE_RESET'

export const boostStages = {
	ADJUSTING_BOOST: 'ADJUSTING_BOOST',
	PAYPAL: 'PAYPAL',
	COMPLETED: 'COMPLETED'
}

const boostPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case boostConstants.SUBMIT_BOOST:
			return {stage: boostStages.PAYPAL, message: "Boost value submitted", messageType: action.messageType, boostValue: action.boostValue}
		case boostConstants.ADJUST_BOOST:
			return {messageType: action.messageType, boostValue: action.boostValue}
		case boostConstants.PAYPAL_SUCCESS:
			return {stage: boostStages.COMPLETED, message: "Problem boosted", messageType: action.messageType, boost: action.boost}
		case boostConstants.PAYPAL_FAILED:
			return {stage: boostStages.BOOSTING, message: action.error, messageType: action.messageType}
		case boostConstants.RESET:
			return initialState
		default:
			return state
	}
}

export default combineReducers({
	page: boostPageReducer,
	form: boostFormReducer
})

export const submitBoost = (boostValue) => ({
	type: boostConstants.SUBMIT_BOOST_SUCCESS,
	boostValue 
})

export const adjustBoost = (boostValue) => ({
	type: boostConstants.ADJUST_BOOST_SUCCESS, boostValue
})


export const savePaypalOrder = (boost, authToken) => {
	const request = () => ({ type: boostConstants.PAYPAL_REQUEST })
	const success = () => ({ type: boostConstants.PAYPAL_SUCCESS })
	const failure = (error) =>  ({ type: boostConstants.FAILED, error, messageType: messageType.ERROR })

	return fetchData(
		'/problem/' + boost.problemId + '/boost',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken },
			body: JSON.stringify(boost)
		},
		request,
		success,
		failure
	)
}


export const reset = () => ({
	type: boostConstants.RESET
})
