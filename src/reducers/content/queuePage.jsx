import { queuePageConstants } from '../../constants/content/queuePage'
import { globalConstants } from '../../constants/global'

const defaultQueueState = {
	entries: [],
	active: {
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
				active: {
					page: state.active.page
				}
			}
		case queuePageConstants.SET_ACTIVE_PAGE_SUCCESS:
			const newEntries = state.entries
			newEntries[activePage - 1] = action.data
			return {
				entries: newEntries.slice(0,activePage),
				active: {
					// If there was no data, dont update
					page: (action.data && action.data.length > 0) ? activePage : state.active.page
				},
				hasMore: action.hasMore
			}
		case queuePageConstants.NETWORK_ERROR:
			return {
				message: action.message
			}
		case queuePageConstants.SET_ACTIVE_ENTRY:
			return {
				entries: state,
				active: {
					page: activePage,
					entry: action.activeEntry
				},
				hasMore: state.hasMore
			}
		default:
			return state
	}
}

export default function queuePageReducer(state = defaultState, action) {
	// tried to solve this for 5 hours, when state is modified directly redux does not detect change :)
	const newState = {...state}
	if (action.queue) {
		newState[action.queue] = singleQueueReducer(state[action.queue] || defaultQueueState, action)	
	}
	return newState
}