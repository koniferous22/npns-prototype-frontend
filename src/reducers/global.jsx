/*
IMPORTANT HOW TO WRAP SHARED STUFF INTO ALL COMPONENTS (SO THAT SHARED STUFF IS UPDATED ANYWHERE)
*/

import { globalConstants } from "../constants/global"

const defaultHierarchy = {Index:{} }
const defaultState = {hierarchy: defaultHierarchy, theme:'buzzfeed' /*Tryhard*/}

export function globalReducer(state = defaultState, action) {
	switch (action.type) {
		case globalConstants.HIERARCHY_LOAD_REQUEST:
			return { hierarchy: defaultHierarchy, theme: state.theme }
		case globalConstants.HIERARCHY_LOAD_SUCCESS:
			return { hierarchy: action.hierarchy || defaultHierarchy, theme: state.theme }
		case globalConstants.HIERARCHY_LOAD_FAILED:
			return { hierarchy: state.hierarchy || defaultHierarchy, theme: state.theme }
		case globalConstants.SET_THEME:
			return { hierarchy: state.hierarchy, theme: action.theme}
		default:
			return state
	}
}