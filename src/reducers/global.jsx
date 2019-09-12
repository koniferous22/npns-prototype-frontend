/*
IMPORTANT HOW TO WRAP SHARED STUFF INTO ALL COMPONENTS (SO THAT SHARED STUFF IS UPDATED ANYWHERE)
*/

import { globalConstants } from "../constants/global"

const defaultHierarchy = {Index:{} }

export function globalReducer(state = { activeQueue: 'Index', hierarchy: defaultHierarchy}, action) {
	switch (action.type) {
		case globalConstants.SET_ACTIVE_QUEUE:
			return { activeQueue : action.activeQueue || 'Index', hierarchy: state.hierarchy };
		case globalConstants.HIERARCHY_LOAD_REQUEST:
			return { activeQueue : state.activeQueue, hierarchy: defaultHierarchy}
		case globalConstants.HIERARCHY_LOAD_SUCCESS:
			return { activeQueue : state.activeQueue, hierarchy: action.hierarchy || defaultHierarchy}
		case globalConstants.HIERARCHY_LOAD_FAILED:
			return { activeQueue : 'Index', hierarchy: state.hierarchy || defaultHierarchy}
		default:
			return state
	}
}