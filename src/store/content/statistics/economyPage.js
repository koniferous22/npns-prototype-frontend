import { appConfig } from '../../../appConfig'
import { messageType } from '../../../constants/misc/backendMessageTypes'
import { fetchData } from '../../../utils'

const LOAD_KARMA_VALUES_REQUEST = 'LOAD_KARMA_VALUES_REQUEST'
const LOAD_KARMA_VALUES_SUCCESS = 'LOAD_KARMA_VALUES_SUCCESS'
const LOAD_KARMA_VALUES_FAILED =  'LOAD_KARMA_VALUES_FAILED'

const defaultState = {}

export default function economyPageReducer(state = defaultState, action) {
	switch (action.type) {
		case economyPageConstants.LOAD_KARMA_VALUES_REQUEST:
			return {
				message: "Loading data...",
				messageType: action.messageType
			}
		case economyPageConstants.LOAD_KARMA_VALUES_SUCCESS:
			return {
				karmaValues: action.data
			}
		case economyPageConstants.LOAD_KARMA_VALUES_FAILED:
			return {
				message: action.message,
				messageType: action.messageType,
				karmaValues: state
			}
		default:
			return state
	}
}

export const loadKarmaValues = () => {
	const request = () => ({ type: economyPageConstants.LOAD_KARMA_VALUES_REQUEST })
	const success = (data) => ({ type: economyPageConstants.LOAD_KARMA_VALUES_SUCCESS, data })
	const failure = (message) => ({ type: economyPageConstants.LOAD_KARMA_VALUES_FAILED, message, messageType: messageType.ERROR })

	return fetchData(
		"/queue/karmaValues",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		success,
		failure
	)
}
