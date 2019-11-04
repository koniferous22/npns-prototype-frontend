import { appConfig } from '../../../appConfig'
import { profilePageConstants } from '../../../constants/content/profile/profilePage'


function loadUserData(username) {
	
	const request = () => ({ type: profilePageConstants.LOAD_USER_SUCCESS })
	const success = (user) => ({type: profilePageConstants.LOAD_USER_SUCCESS, user})
	const failure = (message) => ({type: profilePageConstants.LOAD_USER_FAILED, message})

	if (!username || username === '') {
		return failure('No username specified')
	}

	return dispatch => {
		dispatch(request())
		const requestUrl = appConfig.backendUrl + "/u/" + username
		fetch(requestUrl, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response
				throw error
			}
		}).then(response => response.json())
		.then(body => {        
			dispatch(success(body))
		}).catch(error => {
			dispatch(failure(error))
		})
	}
}

export const profilePageActions = {
	loadUserData
}
