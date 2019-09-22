/*
IMPORTANT HOW TO WRAP SHARED STUFF INTO ALL COMPONENTS (SO THAT SHARED STUFF IS UPDATED ANYWHERE)
*/

import { globalConstants } from "../constants/global"

const defaultHierarchy = {Index:{} }

export function globalReducer(state = { hierarchy: defaultHierarchy}, action) {
	switch (action.type) {
		case globalConstants.HIERARCHY_LOAD_REQUEST:
			return { hierarchy: defaultHierarchy}
		case globalConstants.HIERARCHY_LOAD_SUCCESS:
			return { hierarchy: action.hierarchy || defaultHierarchy}
		case globalConstants.HIERARCHY_LOAD_FAILED:
			return { hierarchy: state.hierarchy || defaultHierarchy}
		default:
			return state
	}
}