import { authConstants } from '../constants/auth'

const initialState = { token: localStorage.getItem('token').replace(new RegExp('"(.*)"'),(match, x) => x) }

export function authReducer(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				user: action.user,
				message: 'Logging in...'
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				user: action.user,/*localStorage.getItem('user'),*/
				token: action.token,
				message: "Welcome"
			};
		// parse if status was 401, then print this, other set new state for server errorz
		case authConstants.LOGIN_INVALID_CREDENTIALS:
			return {
				message: 'Invalid credentials'
			};
		case authConstants.LOGOUT:
			return {
				message: 'Logged out'
				// possibly redirect here
			}
		case authConstants.TOKEN_VERIFY_REQUEST:
			return {
				token: state.token,
				message: 'Re-logging in'
			}
		case authConstants.TOKEN_VERIFIED:
			return {
				user: action.user,/*localStorage.getItem('user'),*/
				//test: !!action.user,
				token: action.token,
				message: "Logged In"
			}
		case authConstants.TOKEN_EXPIRED:
			return {
				message: 'Session expired re-log in',
				token: state.token
			}
		default:
			return state
	}
}