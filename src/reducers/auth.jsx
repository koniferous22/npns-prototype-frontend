import { authConstants } from '../constants/auth'

const token = localStorage.getItem('token')
const initialState = { token: token || token === "" ? token.replace(new RegExp('"(.*)"'),(match, x) => x) : null }

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				message: 'Logging in...',
				messageType: action.messageType
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				user: action.user,/*localStorage.getItem('user'),*/
				token: action.token,
				message: "Welcome",
				messageType: action.messageType
			};
		case authConstants.LOGIN_FAILURE:
			return {
				user: action.user,
				message: action.message,
				messageType: action.messageType
			};
		// parse if status was 401, then print this, other set new state for server errorz
		case authConstants.LOGIN_INVALID_CREDENTIALS:
			return {
				message: 'Invalid credentials',
				messageType: action.messageType
			};
		case authConstants.LOGOUT:
			return {
				message: 'Logged out',
				messageType: action.messageType
				// possibly redirect here
			}
		case authConstants.TOKEN_VERIFY_REQUEST:
			return {
				// leave it here, then when accessing private resource, detects as logged out and redirects
				...state,
				message: 'Re-logging in',
				messageType: action.messageType
			}
		case authConstants.TOKEN_VERIFIED:
			return {
				user: action.user,
				token: action.token,
				message: "Logged In",
				messageType: action.messageType
			}
		case authConstants.TOKEN_EXPIRED:
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
