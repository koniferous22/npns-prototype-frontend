import { combineReducers } from 'redux'
import { reducer as scoreboardSearchFormReducer } from 'redux-form'

import { appConfig } from '../../../appConfig'
import { messageType } from '../../../constants/misc/backendMessageTypes'
import { fetchData } from '../../../utils'

const LOAD_PAGE_REQUEST = 'SCOREBOARD_PAGE_LOAD_PAGE_REQUEST'
const LOAD_PAGE_SUCCESS = 'SCOREBOARD_PAGE_LOAD_PAGE_SUCCESS'
const LOAD_PAGE_FAILED = 'SCOREBOARD_PAGE_LOAD_PAGE_FAILED'
const USER_SEARCH_REQUEST = 'SCOREBOARD_PAGE_USER_SEARCH_REQUEST'
const USER_SEARCH_SUCCESS = 'SCOREBOARD_PAGE_USER_SEARCH_SUCCESS'
const USER_SEARCH_FAILED = 'SCOREBOARD_PAGE_USER_SEARCH_FAILED'
const USER_COUNT_REQUEST = 'SCOREBOARD_PAGE_USER_COUNT_REQUEST'
const USER_COUNT_SUCCESS = 'SCOREBOARD_PAGE_USER_COUNT_SUCCESS'
const USER_COUNT_FAILED = 'SCOREBOARD_PAGE_USER_COUNT_FAILED'
const RESET = 'SCOREBOARD_PAGE_RESET'

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
		case LOAD_PAGE_REQUEST:
			return {
				...state,
				activePage: action.activePage,
				message: 'Loading...',
				messageType: action.messageType,
				highlight: null,
				userFlag: false
			}
		case LOAD_PAGE_SUCCESS:
			return {
				...state,
				data: action.data,
				activePage: action.activePage,
				message: '',
				messageType: action.messageType,
				highlight: null,
				userFlag: false
			}
		case LOAD_PAGE_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType,
				userFlag: false
			}
		case USER_SEARCH_REQUEST:
			return {
				...state,
				message: 'Loading...',
				messageType: action.messageType
			}
		case USER_SEARCH_SUCCESS:
			return {
				...state,
				activePage: action.activePage,
				userFlag: true,
				message: null,
				messageType: action.messageType,
				highlight: action.username
			}
		case USER_SEARCH_FAILED:
			return {
				...state,
				message: action.message,
				messageType: action.messageType
			}
		case USER_COUNT_REQUEST:
			return {
				...state,
				message: 'Loading...',
				messageType: action.messageType
			}
		case USER_COUNT_SUCCESS:
			return {
				...state,
				pageCount: action.pageCount,
			}
		case USER_COUNT_FAILED:
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
	if (action.type === RESET) {
		return defaultState
	}
	const newState = {...state}
	if (action.queue) {
		newState[action.queue] = singleScoreboardPageReducer(state[action.queue] || defaultQueueScoreboardState, action)	
	}
	return newState
}

export default combineReducers({
	page: scoreboardPageReducer,
	form: scoreboardSearchFormReducer
})


export const setActivePage = (queue, pageIndex) => {

	const request = (activePage) => ({ type: LOAD_PAGE_REQUEST, queue, activePage })
	const success = (queue, activePage, data) => ({ type: LOAD_PAGE_SUCCESS, queue, activePage, data })
	const failure = (message) => ({ type: LOAD_PAGE_FAILED, queue, message, messageType: messageType.ERROR })

	return fetchData(
		"/queue/" + queue + "/scoreboard",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		() => request(pageIndex),
		({data}) => success(queue, pageIndex, data),
		failure
	)
}

export const findUser = (queue, username, recordsPerPage) => {
	const request = () => ({ type: USER_SEARCH_REQUEST, queue })
	const success = (username, activePage) => ({ type: USER_SEARCH_SUCCESS, queue, username, activePage })
	const failure = (message) => ({ type: USER_SEARCH_FAILED, queue, message, messageType: messageType.ERROR })

	if(!queue) {
		return failure('No queue specified')
	}

	if(!username) {
		return failure('No username specified')
	}
	if(!recordsPerPage) {
		recordsPerPage = 50
	}
	return fetchData(
		"/queue/" + queue + "/scoreboard/position/" + username,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		({position}) => (
			position
				? success(username, Math.floor(((position - 1) / recordsPerPage) + 1))
				: failure('User "' + username + '" has no score in queue "' + queue + '"')
		),
		failure
	)
}

export const getNumberOfPages = (queue) => {
	const request = () => ({ type: USER_COUNT_REQUEST, queue })
	const success = (pageCount) => ({ type: USER_COUNT_SUCCESS, queue, pageCount })
	const failure = (message) => ({ type: USER_COUNT_FAILED, queue, message, messageType: messageType.ERROR })

	if(!queue) {
		return failure('No queue specified')
	}

	return fetchData(
		"/queue/" + queue + "/user_count",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		({ body_count }) => success(Math.floor((body_count / 50)) + 1),
		failure
	)
}

export const reset = () => ({
	type: RESET
})

export const validateUserExists = (username) => {
	return new Promise((resolve, reject) => {
		fetch(appConfig.backendUrl + "/u/exists", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({user: username})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return resolve()
			}
			return reject({identifier: 'User "' + username + '" does not exists'})
		})
	})
}

