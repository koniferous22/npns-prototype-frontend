import { scoreboardPageConstants } from '../../../constants/content/statistics/scoreboardPage'

const defaultState = {
	data: [],
	activePage: 0
}

function scoreboardPageReducer(state=defaultState, action) {
	switch(action.type) {
		case scoreboardPageConstants.LOAD_PAGE_REQUEST:
			return {
				activePage: action.activePage,
				message: 'Loading...',
				data: state.data
			}
		case scoreboardPageConstants.LOAD_PAGE_SUCCESS:
			return {
				data: action.data,
				activePage: action.activePage
			}
		case scoreboardPageConstants.LOAD_PAGE_FAILED:
			return {
				data: state.data,
				message: action.message
			}
		case scoreboardPageConstants.USER_SEARCH_REQUEST:
			return {
				message: 'Loading...',
				searching: true,
				data: state.data
			}
		case scoreboardPageConstants.USER_SEARCH_SUCCESS:
			return {
				activePage: action.activePage,
				searching: true,
				data: state.data
			}
		case scoreboardPageConstants.USER_SEARCH_FAILED:
			return {
				data: state.data,
				message: action.message
			}
		case scoreboardPageConstants.RESET:
			return defaultState
		default:
			return state
	}
}

export default scoreboardPageReducer;
