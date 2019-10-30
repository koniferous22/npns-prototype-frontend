import { transactionPageConstants } from '../../../constants/content/profile/transactionPage'

const defaultState = {
	entries: [],
	paging: {
		page: 0,
		hasMore: true
	}
}

function transactionPageReducer(state=defaultState, action) {
	const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
	switch (action.type) {
		case transactionPageConstants.LOAD_TRANSACTION_PAGE_REQUEST:
			return {
				message: 'Loading transactions...',
				entries: state.entries,
				paging: {
					page: state.paging.page
				}
			}
		case transactionPageConstants.LOAD_TRANSACTION_PAGE_FAILED:
			return {
				message: action.message,
				paging: {
					...state.paging,
					hasMore: false
				},
				entries: state.entries
			}
		case transactionPageConstants.LOAD_TRANSACTION_PAGE_SUCCESS:
			const newEntries = state.entries
			newEntries[activePage - 1] = action.data
			return {
				entries: newEntries.slice(0,activePage),
				paging: {
					// If there was no data, dont update
					page: (action.data && action.data.length > 0) ? activePage : state.paging.page,
					hasMore: action.hasMore
				},
			}
		default:
			return state
	}
}

export default transactionPageReducer