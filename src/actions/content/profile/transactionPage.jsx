import { appConfig } from '../../../appConfig'
import { transactionPageConstants } from '../../../constants/content/profile/transactionPage';

function setActivePage(token, pageIndex) {

	const request = (activePage) => ({ type: transactionPageConstants.LOAD_TRANSACTION_PAGE_REQUEST, activePage })
	const success = (activePage, data, hasMore) => ({ type: transactionPageConstants.LOAD_TRANSACTION_PAGE_SUCCESS, activePage, data, hasMore })
	const failure = (message) => ({ type: transactionPageConstants.LOAD_TRANSACTION_PAGE_FAILED, message })

	return dispatch => {
		dispatch(request(pageIndex));
		var requestUrl = appConfig.backendUrl + "/u/transactions"
		requestUrl += (pageIndex && pageIndex > 0) ? "?page=" + pageIndex : ""
		fetch(requestUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
		}).then(response => {
			// NOTE: perhaps parse 304 statuses, so more efficient
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {        
			dispatch(success(pageIndex, body.data, body.hasMore))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

export const transactionPageActions = {
	setActivePage
}