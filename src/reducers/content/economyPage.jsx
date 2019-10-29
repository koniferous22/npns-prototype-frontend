import { economyPageConstants } from '../../constants/content/economyPage'

const defaultState = {}

function economyPageReducer(state = defaultState, action) {
	switch (action.type) {
		case economyPageConstants.LOAD_KARMA_VALUES_REQUEST:
			return {
				message: "Loading data..." 
			}
		case economyPageConstants.LOAD_KARMA_VALUES_SUCCESS:
			return {
				karmaValues: action.data
			}
		case economyPageConstants.LOAD_KARMA_VALUES_FAILED:
			return {
				message: action.message,
				karmaValues: state
			}
		default:
			return state
	}
}

export default economyPageReducer
