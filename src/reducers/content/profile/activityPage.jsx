import { activityPageConstants } from '../../../constants/content/profile/activityPage'

const defaultState = {
	entries: [],
	paging: {
		page: 0,
		hasMore: true
	}
}

function activityPageReducer(state = defaultState, action) {
	const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
	switch (action.type) {
		case activityPageConstants.SET_ACTIVE_PAGE_REQUEST:
			return {
				entries: state.entries,
				paging: {
					page: state.paging.page
				}
			}
		case activityPageConstants.SET_ACTIVE_PAGE_SUCCESS:
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
		case activityPageConstants.SET_ACTIVE_PAGE_FAILED:
			return {
				message: action.message,
				paging: {
					...state.paging,
					hasMore: false
				},
				entries: state.entries
			}
		case activityPageConstants.SET_USER:

			return state.user === action.user ? state : {
				...defaultState,
				user: action.user
			}
		case activityPageConstants.RESET:
			return defaultState
		default:
			return state
	}
}

export default activityPageReducer