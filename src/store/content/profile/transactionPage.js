import { appConfig } from '../../../appConfig'
import { messageType } from '../../../constants/misc/backendMessageTypes'
import { fetchData } from '../../../utils'

const LOAD_TRANSACTION_PAGE_REQUEST = "TRANSACTION_PAGE_LOAD_TRANSACTION_PAGE_REQUEST"
const LOAD_TRANSACTION_PAGE_SUCCESS = "TRANSACTION_PAGE_LOAD_TRANSACTION_PAGE_SUCCESS"
const LOAD_TRANSACTION_PAGE_FAILED = "TRANSACTION_PAGE_LOAD_TRANSACTION_PAGE_FAILED"
const RESET = "TRANSACTION_PAGE_RESET_PAGES"

const defaultState = {
	entries: [],
	paging: {
		page: 0,
		hasMore: true
	}
}

export default function transactionPageReducer(state=defaultState, action) {
	const activePage = (!action.activePage || action.activePage <= 1) ? 1 : action.activePage
	switch (action.type) {
		case LOAD_TRANSACTION_PAGE_REQUEST:
			return {
				message: 'Loading transactions...',
				loading: true,
				entries: state.entries,
				paging: {
					page: state.paging.page
				}
			}
		case LOAD_TRANSACTION_PAGE_FAILED:
			return {
				message: action.message,
				paging: {
					...state.paging,
					hasMore: false
				},
				entries: state.entries
			}
		case LOAD_TRANSACTION_PAGE_SUCCESS:
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
		case RESET:
			return defaultState
		default:
			return state
	}
}

export const setActivePage = (token, pageIndex) => {

	const request = (activePage) => ({ type: transactionPageConstants.LOAD_TRANSACTION_PAGE_REQUEST, activePage })
	const success = (activePage, data, hasMore) => ({ type: transactionPageConstants.LOAD_TRANSACTION_PAGE_SUCCESS, activePage, data, hasMore })
	const failure = (message) => ({ type: transactionPageConstants.LOAD_TRANSACTION_PAGE_FAILED, message, messageType: messageType.ERROR })

	return fetchData(
		"/u/transactions",
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
		},
		() => request(pageIndex),
		({ body, hasMore }) => success(pageIndex, data, hasMore),
		failure
	)
}

export const reset = () => ({
	type: transactionPageConstants.RESET
})

