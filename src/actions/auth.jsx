import { authConstants } from '../constants/auth'
import { messageType } from '../constants/misc/backendMessageTypes'
import { appConfig } from '../appConfig'

import { fetchData } from '../utils'

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

	function request(user) { return { type: authConstants.LOGIN_REQUEST, user: user } }
	function success(user, token) { return { type: authConstants.LOGIN_SUCCESS, user, token} }
	function invalid_credentials(error) { return { type: authConstants.LOGIN_INVALID_CREDENTIALS, error: error, messageType: messageType.ERROR } }

	return fetchData(
		'/signin',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		},
		(dispatch) => dispatch(request({username})),
		({ user, token }) => {
			localStorage.setItem('token', JSON.stringify(token));
			return success(user,token)
		},
		(error) => invalid_credentials(error),
	)
}

function logout(token) {
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
	
	function request(token) { return { type: authConstants.TOKEN_VERIFY_REQUEST, token }}
	function success(user, token) { return { type: authConstants.TOKEN_VERIFIED, user, token} }
	function token_expired() { return { type: authConstants.TOKEN_EXPIRED } }
	function no_token() { return {type: authConstants.LOGOUT} }

	if (!token) {
		return no_token()
	}

	return fetchData(
		"/verify/login",
		{
			method: 'POST',
			headers: {
				'Content-Type'  : 'application/json',
				'Authorization' : 'Bearer ' + token
			}
			
		},
		() => request(token),
		({ user, token }) => success(user, token),
		() => token_expired()
	)
}
