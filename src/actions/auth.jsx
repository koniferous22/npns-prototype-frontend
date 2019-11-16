import { authConstants } from '../constants/auth'
import { messageType } from '../constants/misc/backendMessageTypes'
import { appConfig } from '../appConfig'

export const authActions = {
	login,
	logout,
	verify
};

function login(username, password) {
	if (!username) {
		return {
			type: authConstants.LOGIN_FAILURE,
			message: 'Missing username',
			messageType: messageType.ERROR
		}
	}
	if (!password) {
		return {
			type: authConstants.LOGIN_FAILURE,
			message: 'Missing password',
			messageType: messageType.ERROR
		}
	}
	return dispatch => {
		dispatch(request({ username }));
		// 2. parse result und depending on that stuff, dispatch success/failure action/reducer idk
		
		fetch(appConfig.backendUrl + "/signin", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		}).then(response => {
			if (response.status >= 200 && response.status < 400){
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response;
				throw error;
			}
		}).then(response => {
			return response.json()
		})
		.then(response => {
			// TODO: verify 401 status as decide between server and client error
			localStorage.setItem('token', JSON.stringify(response.token));
			dispatch(success(response.user, response.token))
		}).catch(error => {
			dispatch(invalid_credentials(error))
		})
	};

	function request(user) { return { type: authConstants.LOGIN_REQUEST, user: user } }
	function success(user, token) { return { type: authConstants.LOGIN_SUCCESS, user, token} }
	function invalid_credentials(error) { return { type: authConstants.LOGIN_INVALID_CREDENTIALS, error: error, messageType: messageType.ERROR } }
}

function logout(token) {
	// NOTE: dunno what this does but looks cool
	/*
	fetch(appConfig.backendUrl + "/logout", {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		})
	*/
	fetch(appConfig.backendUrl + "/logout", {
		method: 'POST',
		headers: {
			'Content-Type'  : 'application/json',
			'Authorization' : 'Bearer ' + token
		}
	}).catch(error => console.log(error));
	localStorage.removeItem('token')
	return { type: authConstants.LOGOUT };
}

function verify(token) {
	if (!token) {
		return no_token()
	}
	return dispatch => {
		dispatch(request(token))
		fetch(appConfig.backendUrl + "/verify/login", {
			method: 'POST',
			headers: {
				'Content-Type'  : 'application/json',
				'Authorization' : 'Bearer ' + token
			}
			
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response;
				throw error;
			}
		}).then(response => {
			return response.json()
		}).then(response => { 
			dispatch(success(response.user, response.token))
		}
		).catch(error => {
			dispatch(token_expired())
		})
	}
	

	function request(token) { return { type: authConstants.TOKEN_VERIFY_REQUEST, token }}
	function success(user, token) { return { type: authConstants.TOKEN_VERIFIED, user, token} }
	function token_expired() { return { type: authConstants.TOKEN_EXPIRED } }
	function no_token() { return {type: authConstants.LOGOUT} }
}
