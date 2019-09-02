import { registrationConstants } from '../constants/registration'
/*
TEMPORARY
*/

export function registration(state = initialState, action) {
	switch (action.type) {
		case registrationConstants.REQUEST:
			return {}
		case registrationConstants.SUCCESS:
			return {}
		case registrationConstants.FAILED:
			return {}
		default:
			return state
	}
}