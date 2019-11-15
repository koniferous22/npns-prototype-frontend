import { queuePageConstants } from '../../constants/content/queuePage'

const defaultQueueState = {
	entries: [],
	paging: {
		page: 0
	}
}

const defaultState = {}

function singleQueueReducer(state = defaultQueueState, action) {
	const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
	switch (action.type) {
		case queuePageConstants.SET_ACTIVE_PAGE_REQUEST:
			return {
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
