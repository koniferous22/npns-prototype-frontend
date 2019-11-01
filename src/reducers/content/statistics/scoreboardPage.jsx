import { scoreboardPageConstants } from '../../../constants/content/statistics/scoreboardPage'

const defaultState = {
	data: [],
	activePage: 1,
	pageCount: 1,
	searching: false
}

function scoreboardPageReducer(state=defaultState, action) {
	switch(action.type) {
		case scoreboardPageConstants.LOAD_PAGE_REQUEST:
			return {
				...state,
				activePage: action.activePage,
				message: 'Loading...',
			}
		case scoreboardPageConstants.LOAD_PAGE_SUCCESS:
			return {
				...state,
				data: action.data,
				activePage: action.activePage
			}
		case scoreboardPageConstants.LOAD_PAGE_FAILED:
			return {
				...state,
				message: action.message
			}
		case scoreboardPageConstants.USER_SEARCH_REQUEST:
			return {
				...state,
				message: 'Loading...',
				searching: true,
			}
		case scoreboardPageConstants.USER_SEARCH_SUCCESS:
			return {
				...state,
				activePage: action.activePage,
				searching: true,
			}
		case scoreboardPageConstants.USER_SEARCH_FAILED:
			return {
				...state,
				message: action.message
			}
		case scoreboardPageConstants.USER_COUNT_REQUEST:
			return {
				...state,
				message: 'Loading...'
			}
		case scoreboardPageConstants.USER_COUNT_SUCCESS:
			return {
				...state,
				pageCount: action.pageCount
			}
		case scoreboardPageConstants.USER_COUNT_FAILED:
			return {
				...state,
				message: action.message
			}
		default:
			return state
	}
}

export default scoreboardPageReducer;
