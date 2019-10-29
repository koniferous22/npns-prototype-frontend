import { appConfig } from '../../../appConfig'
import { activityPageConstants } from '../../../constants/content/profile/activityPage';


function setActivePage(user, pageIndex) {

	const request = (activePage) => ({ type: activityPageConstants.SET_ACTIVE_PAGE_REQUEST, activePage })
	const success = (activePage, data, hasMore) => ({ type: activityPageConstants.SET_ACTIVE_PAGE_SUCCESS, activePage, data, hasMore })
	const failure = (message) => ({ type: activityPageConstants.SET_ACTIVE_PAGE_FAILED, message })
	if (!user) {
		return dispatch => {
			dispatch(failure('No user specified'))
		}
	}

	return dispatch => {
		dispatch(request(pageIndex));
		var requestUrl = appConfig.backendUrl + "/u/" + user  +"/posts"
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
			dispatch(success(pageIndex, body.data, body.hasMore))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
}

function setUser(user) {
	return {
		type: activityPageConstants.SET_USER,
		user: user
	}
}

export const activityPageActions = {
	setActivePage,
	setUser
}
