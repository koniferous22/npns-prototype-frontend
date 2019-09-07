/*
IMPORTANT HOW TO WRAP SHARED STUFF INTO ALL COMPONENTS (SO THAT SHARED STUFF IS UPDATED ANYWHERE)
*/

import { globalConstants } from "../constants/global"

export function globalReducer(state = { activeQueue: 'Index'}, action) {
	switch (action.type) {
		case globalConstants.SET_ACTIVE_QUEUE:
			return { activeQueue : action.activeQueue || 'Index' };
		default:
			return state
	}
}