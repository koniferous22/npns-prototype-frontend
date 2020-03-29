
import { appConfig } from '../appConfig'
import { fetchData, messageType } from '../utils'

const LOGIN_REQUEST = 'AUTH_LOGIN_REQUEST';
const LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
const LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';
const LOGIN_INVALID_CREDENTIALS = 'AUTH_LOGIN_INVALID_CREDENTIALS';
const LOGOUT = 'AUTH_LOGOUT';
const TOKEN_VERIFY_REQUEST = 'AUTH_TOKEN_VERIFY_REQUEST';
const TOKEN_VERIFIED = 'AUTH_TOKEN_VERIFIED';
const TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED';

const token = localStorage.getItem('token')
const initialState = { token: token || token === "" ? token.replace(new RegExp('"(.*)"'),(match, x) => x) : null }

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case LOGIN_REQUEST:
			return {
				message: 'Logging in...',
				messageType: action.messageType
			};
		case LOGIN_SUCCESS:
			return {
				user: action.user,/*localStorage.getItem('user'),*/
				token: action.token,
				message: "Welcome",
				messageType: action.messageType
			};
		case LOGIN_FAILURE:
			return {
				user: action.user,
				message: action.message,
				messageType: action.messageType
			};
		// parse if status was 401, then print this, other set new state for server errorz
		case LOGIN_INVALID_CREDENTIALS:
			return {
				message: 'Invalid credentials',
				messageType: action.messageType
			};
		case LOGOUT:
			return {
				message: 'Logged out',
				messageType: action.messageType
				// possibly redirect here
			}
		case TOKEN_VERIFY_REQUEST:
			return {
				// leave it here, then when accessing private resource, detects as logged out and redirects
				...state,
				message: 'Re-logging in',
				messageType: action.messageType
 				}
		case TOKEN_VERIFIED:
			return {
				user: action.user,
				token: action.token,
				message: "Logged In",
				messageType: action.messageType
			}
		case TOKEN_EXPIRED:
			localStorage.removeItem('token')
			return {
				message: 'Session expired re-log in',
				messageType: action.messageType,
				token: state.token
			}
		default:
			return state
	}
}


export const login = (username, password) => {
	if (!username) {
		return {
			type: LOGIN_FAILURE,
			message: 'Missing username',
			messageType: messageType.ERROR
		}
	}
	if (!password) {
		return {
			type: LOGIN_FAILURE,
			message: 'Missing password',
			messageType: messageType.ERROR
		}
	}

	function request(user) { return { type: LOGIN_REQUEST, user: user } }
	function success(user, token) { return { type: LOGIN_SUCCESS, user, token} }
	function invalid_credentials(error) { return { type: LOGIN_INVALID_CREDENTIALS, error: error, messageType: messageType.ERROR } }

	return fetchData(
		'/signin',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		},
		() => request({username}),
		({ user, token }) => {
			localStorage.setItem('token', JSON.stringify(token));
			return success(user,token)
		},
		(error) => invalid_credentials(error),
	)
}

export const logout = (token) => {
	fetch(appConfig.backendUrl + "/logout", {
		method: 'POST',
		headers: {
			'Content-Type'  : 'application/json',
			'Authorization' : 'Bearer ' + token
		}
	}).catch(error => console.log(error));
	localStorage.removeItem('token')
	return { type: LOGOUT };
}

export const verify = (token) => {
	
	function request(token) { return { type: TOKEN_VERIFY_REQUEST, token }}
	function success(user, token) { return { type: TOKEN_VERIFIED, user, token} }
	function token_expired() { return { type: TOKEN_EXPIRED } }
	function no_token() { return {type: LOGOUT} }

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

