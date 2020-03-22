import { fetchData } from '../../utils'

const SET_ACTIVE_PAGE_REQUEST = "QUEUE_PAGE_SET_ACTIVE_PAGE_REQUEST"
const SET_ACTIVE_PAGE_SUCCESS = "QUEUE_PAGE_SET_ACTIVE_PAGE_SUCCESS"
const NETWORK_ERROR = "QUEUE_PAGE_NETWORK_ERROR"

const SET_ACTIVE_ENTRY = "QUEUE_PAGE_SET_ACTIVE_ENTRY"
const RESET = "QUEUE_PAGE_RESET_PAGES"


const defaultQueueState = {
	entries: [],
	paging: {
		page: 0
	}
}

const defaultState = {}

export default function singleQueueReducer(state = defaultQueueState, action) {
	const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
	switch (action.type) {
		case queuePageConstants.SET_ACTIVE_PAGE_REQUEST:
			return {
				loading: true,
				entries: state.entries,
				paging: {
					page: state.paging.page
				}
			}
		case queuePageConstants.SET_ACTIVE_PAGE_SUCCESS:
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
		case queuePageConstants.NETWORK_ERROR:
			return {
				message: action.message,
				messageType: action.messageType,
				paging: {
					...state.paging,
					hasMore: false
				},
				entries: state.entries
			}
		case queuePageConstants.SET_ACTIVE_ENTRY:
			return {
				entries: state,
				paging: {
					page: activePage,
					entry: action.activeEntry,
					hasMore: state.hasMore
				}
			}
		default:
			return state
	}
}

export default function queuePageReducer(state = defaultState, action) {
	// tried to solve this for 5 hours, when state is modified directly redux does not detect change :)
	if (action.type === queuePageConstants.RESET) {
		return defaultState
	}
	const newState = {...state}
	if (action.queue) {
		newState[action.queue] = singleQueueReducer(state[action.queue] || defaultQueueState, action)	
	}
	return newState
}

export const setActivePage = (queue,pageIndex) => {

	const request = (queue, activePage) => ({ type: queuePageConstants.SET_ACTIVE_PAGE_REQUEST, activePage, queue })
	const success = (queue, activePage, data, hasMore) => ({ type: queuePageConstants.SET_ACTIVE_PAGE_SUCCESS, activePage, data, queue, hasMore })
	const failure = (queue, message) => ({ type: queuePageConstants.NETWORK_ERROR, message, messageType: messageType.ERROR, queue })

	if (!queue) {
		return {type: queuePageConstants.NETWORK_ERROR, queue:'Index', message: 'No queue specified', messageType: messageType.ERROR}
	}

	return fetchData(
		"/queue/" + queue + "/problems",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		() => request(queue, pageIndex),
		({ data, hasMore }) => success(queue, pageIndex, data, hasMore),
		(error) => failure(queue, error)
	)
}

export const setActiveEntry = (queue, activePage, activeEntry) => ({
	type: queuePageConstants.SET_ACTIVE_ENTRY,
	queue,
	activePage,
	activeEntry
})

export const reset = (queue) => ({
	type: queuePageConstants.RESET,
	queue
})
