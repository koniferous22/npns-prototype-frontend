import { userConstants } from '../constants/user-constants';

export function homepageAlert(state = {message: "welcome"}, action) {
	switch (action.type) {
		case userConstants.ALERT_MESSAGE:
			return { message: action.message };
		default:
			return state
	}
}
