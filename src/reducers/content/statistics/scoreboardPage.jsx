import { scoreboardPageConstants } from '../../../constants/content/statistics/scoreboardPage'

const defaultState = {
	data: {},
	activePage: 1,
	pageCount: 1,
	userFlag: false
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
			const newData = {...state.data, [action.queue]: action.data}
			return {
				...state,
				data: newData,
				activePage: action.activePage,
				message: ''
			}
		case scoreboardPageConstants.LOAD_PAGE_FAILED:
			return {
				...state,
				message: action.message
			}
		case scoreboardPageConstants.USER_SEARCH_REQUEST:
			return {
				...state,
				message: 'Loading...'
			}
		case scoreboardPageConstants.USER_SEARCH_SUCCESS:
			return {
				...state,
				activePage: action.activePage,
				userFlag: true,
				message: null
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
				pageCount: action.pageCount,
				message: null
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
