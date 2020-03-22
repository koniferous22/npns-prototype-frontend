import { messageType } from '../../../constants/misc/backendMessageTypes'

import { fetchData } from '../../../utils'

const SET_ACTIVE_PAGE_REQUEST = "ACTIVITY_PAGE_SET_ACTIVE_PAGE_REQUEST"
const SET_ACTIVE_PAGE_SUCCESS = "ACTIVITY_PAGE_SET_ACTIVE_PAGE_SUCCESS"
const SET_ACTIVE_PAGE_FAILED = "ACTIVITY_PAGE_SET_ACTIVE_PAGE_FAILED"
const SET_USER = "ACTIVITY_PAGE_SET_USER"
const RESET = "ACTIVITY_PAGE_RESET_PAGES"

const defaultState = {
	entries: [],
	paging: {
		page: 0,
		hasMore: true
	}
}

export default function activityPageReducer(state = defaultState, action) {
	const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
	switch (action.type) {
		case SET_ACTIVE_PAGE_REQUEST:
			return {
				entries: state.entries,
				loading: true,
				paging: {
					page: state.paging.page
				}
			}
		case SET_ACTIVE_PAGE_SUCCESS:
			const newEntries = state.entries
			newEntries[activePage - 1] = action.data || []
			return {
				entries: newEntries.slice(0,activePage),
				paging: {
					// If there was no data, dont update
					page: (action.data && action.data.length > 0) ? activePage : state.paging.page,
					hasMore: action.hasMore
				},
			}
		case SET_ACTIVE_PAGE_FAILED:
			return {
				message: action.message,
				paging: {
					...state.paging,
					hasMore: false
				},
				entries: state.entries
			}
		case SET_USER:

			return state.user === action.user ? state : {
				...defaultState,
				user: action.user
			}
		case RESET:
			return defaultState
		default:
			return state
	}
}

export const setActivePage = (user, pageIndex) => {

	const request = (activePage) => ({ type: SET_ACTIVE_PAGE_REQUEST, activePage })
	const success = (activePage, data, hasMore) => ({ type: SET_ACTIVE_PAGE_SUCCESS, activePage, data, hasMore })
	const failure = (message) => ({ type: SET_ACTIVE_PAGE_FAILED, message, messageType: messageType.ERROR })
	if (!user) {
		return dispatch => {
			dispatch(failure('No user specified'))
		}
	}

	return fetchData(
		"/u/" + user + "/posts",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		() => request(pageIndex),
		({data, hasMore}) => success(pageIndex, data, hasMore),
		failure
	)
}

export const setUser = (user) => ({
	type: SET_USER,
	user: user
})

export const reset = () => ({
	type: RESET
})
