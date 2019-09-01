import { authConstants } from '../constants/auth'

const initialState = { }

/*
waiting:
*/

export function auth(state = initialState, action) {
	switch (action.type) {
		case authConstants.LOGIN_REQUEST:
			return {
				user: action.user,
				message: 'Logging in...'
			};
		case authConstants.LOGIN_SUCCESS:
			return {
				user: action.user,
				token: action.token
				// possibly redirect here
			};
		case authConstants.LOGIN_FAILURE:
			return {
				message: 'Invalid credentials'
			};
		case authConstants.LOGOUT:
			return {
				message: 'Logged out'
				// possibly redirect here
			}
		case authConstants.TOKEN_VERIFY:
			return {
				user: state.user,
				token: state.token,
				waiting: true
			}
		case authConstants.TOKEN_EXPIRED:
			return {
				message: 'Session expired re-log in'
				// possibly redirect here
			}
		default:
			return state
	}
}