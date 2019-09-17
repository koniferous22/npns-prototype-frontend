import { queuePageConstants } from '../../constants/content/queuePage'

const defaultQueueState = {
	entries: [],
	active: {
		page: 0
	}
}

const defaultState = {}

function singleQueueReducer(state = defaultQueueState, action) {
	const activePage = (!action.activePage || action.activePage <= 0) ? 0 : action.activePage
	switch (action.type) {
		case queuePageConstants.SET_ACTIVE_PAGE_REQUEST:
			return {
				entries: state.entries,
				active: {
					page: activePage
				}
			}
		case queuePageConstants.SET_ACTIVE_PAGE_SUCCESS:
			const newEntries = state.entries
			newEntries[activePage] = action.data
			return {
				entries: newEntries.slice(activePage),
				active: {
					page: activePage
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
	console.log('ACTION')
	console.log(action)
	state[action.queue] = singleQueueReducer(state[action.queue] || defaultQueueState, action)
	return state
}