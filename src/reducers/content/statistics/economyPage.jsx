import { economyPageConstants } from '../../../constants/content/statistics/economyPage'

const defaultState = {}

function economyPageReducer(state = defaultState, action) {
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

export default economyPageReducer
