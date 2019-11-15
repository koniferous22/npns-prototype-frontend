import { combineReducers } from 'redux'
import { reducer } from 'redux-form'

import { scoreboardPageConstants } from '../../../constants/content/statistics/scoreboardPage'

const defaultQueueScoreboardState = {
	data: [],
	activePage: 1,
	pageCount: 1,
	userFlag: false,
	highlight: null
}

const defaultState = {}

function singleScoreboardPageReducer(state=defaultQueueScoreboardState, action) {
	switch(action.type) {
		case scoreboardPageConstants.LOAD_PAGE_REQUEST:
			return {
				...state,
				activePage: action.activePage,
				message: 'Loading...',
				messageType: action.messageType,
				highlight: null,
				userFlag: false
			}
		case scoreboardPageConstants.LOAD_PAGE_SUCCESS:
			return {
				...state,
				data: action.data,
				activePage: action.activePage,
				message: '',
				messageType: action.messageType,
				highlight: null,
				userFlag: false
			}
		case scoreboardPageConstants.LOAD_PAGE_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType,
				userFlag: false
			}
		case scoreboardPageConstants.USER_SEARCH_REQUEST:
			return {
				...state,
				message: 'Loading...',
				messageType: action.messageType
			}
		case scoreboardPageConstants.USER_SEARCH_SUCCESS:
			return {
				...state,
				activePage: action.activePage,
				userFlag: true,
				message: null,
				messageType: action.messageType,
				highlight: action.username
			}
		case scoreboardPageConstants.USER_SEARCH_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType
			}
		case scoreboardPageConstants.USER_COUNT_REQUEST:
			return {
				...state,
				message: 'Loading...',
				messageType: action.messageType
			}
		case scoreboardPageConstants.USER_COUNT_SUCCESS:
			return {
				...state,
				pageCount: action.pageCount,
			}
		case scoreboardPageConstants.USER_COUNT_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType
			}
		default:
			return state
	}
}

function scoreboardPageReducer(state = defaultState, action) {
	if (action.type === scoreboardPageConstants.RESET) {
		return defaultState
	}
	const newState = {...state}
	if (action.queue) {
		newState[action.queue] = singleScoreboardPageReducer(state[action.queue] || defaultQueueScoreboardState, action)	
	}
	return newState
}

const scoreboardSearchFormReducer = reducer

export default combineReducers({
	page: scoreboardPageReducer,
	form: scoreboardSearchFormReducer
})
