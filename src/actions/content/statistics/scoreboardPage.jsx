import { appConfig } from '../../../appConfig'
import { scoreboardPageConstants } from '../../../constants/content/statistics/scoreboardPage'

function setActivePage(queue, pageIndex) {

	const request = (activePage) => ({ type: scoreboardPageConstants.LOAD_PAGE_REQUEST, queue, activePage })
	const success = (queue, activePage, data) => ({ type: scoreboardPageConstants.LOAD_PAGE_SUCCESS, queue, activePage, data })
	const failure = (message) => ({ type: scoreboardPageConstants.LOAD_PAGE_FAILED, queue, message })

	return dispatch => {
		if (!queue) {
			return failure('No queue specified')
		}
		dispatch(request(pageIndex));
		var requestUrl = appConfig.backendUrl + "/queue/" + queue + '/scoreboard'
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
			dispatch(success(queue, pageIndex, body.data))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function findUser(queue, username, recordsPerPage) {
	const request = () => ({ type: scoreboardPageConstants.USER_SEARCH_REQUEST, queue })
	const success = (username, activePage) => ({ type: scoreboardPageConstants.USER_SEARCH_SUCCESS, queue, username, activePage })
	const failure = (message) => ({ type: scoreboardPageConstants.USER_SEARCH_FAILED, queue, message })

	if(!queue) {
		return failure('No queue specified')
	}

	if(!username) {
		return failure('No username specified')
	}
	if(!recordsPerPage) {
		recordsPerPage = 50
	}
	return dispatch => {
		dispatch(request());
		const requestUrl = appConfig.backendUrl + "/queue/" + queue + '/scoreboard/position/' + username
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
			if (!body.position) {
				return dispatch(failure('User "' + username + '" has no score in queue "' + queue + '"'))
			}
			dispatch(success(username, Math.floor(((body.position - 1) / recordsPerPage) + 1)))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function getNumberOfPages(queue) {
	const request = () => ({ type: scoreboardPageConstants.USER_COUNT_REQUEST, queue })
	const success = (pageCount) => ({ type: scoreboardPageConstants.USER_COUNT_SUCCESS, queue, pageCount })
	const failure = (message) => ({ type: scoreboardPageConstants.USER_COUNT_FAILED, queue, message })

	if(!queue) {
		return failure('No queue specified')
	}
	return dispatch => {
		dispatch(request());
		const requestUrl = appConfig.backendUrl + "/queue/" + queue + '/user_count'
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
			const page_count = (Math.floor(body.body_count / 50)) + 1
			dispatch(success(page_count))
		}).catch(error => {
			dispatch(failure(JSON.stringify(error)))
		})
	}
}

function reset() {
	return {
		type: scoreboardPageConstants.RESET
	}
}

function validateUserExists(username) {
	return new Promise((resolve, reject) => {
		fetch(appConfig.backendUrl + "/u/exists", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({user: username})
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return resolve()
			}
			return reject({identifier: 'User "' + username + '" does not exists'})
		})
	})
}

export const scoreboardPageActions = {
	setActivePage,
	findUser,
	getNumberOfPages,
	reset,
	validateUserExists
}
