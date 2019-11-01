import { appConfig } from '../../../appConfig'
import { scoreboardPageConstants } from '../../../constants/content/statistics/scoreboardPage'

function setActivePage(queue, token, pageIndex) {

	const request = (activePage) => ({ type: scoreboardPageConstants.LOAD_PAGE_REQUEST, activePage })
	const success = (activePage, data) => ({ type: scoreboardPageConstants.LOAD_PAGE_SUCCESS, activePage, data })
	const failure = (message) => ({ type: scoreboardPageConstants.LOAD_PAGE_FAILED, message })

	return dispatch => {
		if (!queue) {
			return failure('No queue specified')
		}
		dispatch(request(pageIndex));
		var requestUrl = appConfig.backendUrl + "/queue/" + queue + '/scoreboard'
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
			dispatch(success(pageIndex, body.data))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function findUser(queue, token, username, recordsPerPage) {
	const request = () => ({ type: scoreboardPageConstants.USER_SEARCH_REQUEST })
	const success = (activePage) => ({ type: scoreboardPageConstants.USER_SEARCH_SUCCESS, activePage })
	const failure = (message) => ({ type: scoreboardPageConstants.USER_SEARCH_FAILED, message })

	if(!queue) {
		return failure('No queue specified')
	}

	if(!username) {
		return failure('No username specified')
	}
	if(!recordsPerPage) {
		recordsPerPage = 50
	}
	console.log(recordsPerPage)
	return dispatch => {
		dispatch(request());
		const requestUrl = appConfig.backendUrl + "/queue/" + queue + '/scoreboard/position' + username
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
			dispatch(success(((body.position - 1) / recordsPerPage) + 1))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}	
}

export const scoreboardPageActions = {
	setActivePage,
	findUser
}
