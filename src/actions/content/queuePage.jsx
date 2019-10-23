import { appConfig } from '../../appConfig'
import { queuePageConstants } from '../../constants/content/queuePage';

function setActivePage(queue,pageIndex) {

	const request = (queue, activePage) => ({ type: queuePageConstants.SET_ACTIVE_PAGE_REQUEST, activePage, queue })
	const success = (queue, activePage, data, hasMore) => ({ type: queuePageConstants.SET_ACTIVE_PAGE_SUCCESS, activePage, data, queue, hasMore })
	const failure = (queue, message) => ({ type: queuePageConstants.NETWORK_ERROR, message, queue })

	return dispatch => {
		dispatch(request(queue, pageIndex));
		var requestUrl = appConfig.backendUrl + "/queue/" + queue + "/problems"
		requestUrl += (pageIndex && pageIndex > 0) ? "?page=" + pageIndex : ""
		fetch(requestUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
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
			dispatch(success(queue, pageIndex, body.data, body.hasMore))
		}).catch(error => {
			dispatch(failure(queue, error))
		})
	}
}


function setActiveEntry(queue, activePage, activeEntry) {
	return {
		type: queuePageConstants.SET_ACTIVE_ENTRY,
		queue,
		activePage,
		activeEntry
	}
}

export const queuePageActions = {
	setActivePage,
	setActiveEntry
}

