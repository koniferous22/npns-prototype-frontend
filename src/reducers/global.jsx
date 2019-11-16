/*
IMPORTANT HOW TO WRAP SHARED STUFF INTO ALL COMPONENTS (SO THAT SHARED STUFF IS UPDATED ANYWHERE)
*/

import { globalConstants, themes, defaultTheme } from "../constants/global"

const defaultHierarchy = {Index:{} }
const defaultLinQueues = ['Index']
const defaultState = {hierarchy: defaultHierarchy, linQueues: defaultLinQueues, theme:defaultTheme, linQueuesDisplayed: false, themesDisplayed: false, themes: themes}

export function globalReducer(state = defaultState, action) {
	switch (action.type) {
		case globalConstants.HIERARCHY_LOAD_REQUEST:
			return { ...state, hierarchy: defaultHierarchy }
		case globalConstants.HIERARCHY_LOAD_SUCCESS:
			return { ...state, hierarchy: action.hierarchy || defaultHierarchy }
		case globalConstants.HIERARCHY_LOAD_FAILED:
			return { ...state, hierarchy: state.hierarchy || defaultHierarchy }
		case globalConstants.LIN_QUEUES_LOAD_REQUEST:
			return { ...state, linQueues: defaultLinQueues }
		case globalConstants.LIN_QUEUES_LOAD_SUCCESS:
			return { ...state, linQueues: action.queues }
		case globalConstants.LIN_QUEUES_LOAD_FAILED:
			return { ...state, linQueues: state.linQueues || defaultLinQueues }
		case globalConstants.LIN_QUEUES_DISPLAY:
			return { ...state, linQueuesDisplayed: true }
		case globalConstants.LIN_QUEUES_HIDE:
			return { ...state, linQueuesDisplayed: false }
		case globalConstants.THEMES_DISPLAY:
			return { ...state, themesDisplayed: true }
		case globalConstants.THEMES_HIDE:
			return { ...state, themesDisplayed: false }
		case globalConstants.SET_THEME:
			if (!Object.keys(themes).includes(action.theme)) {
				return state;
			}
			return { ...state, theme: action.theme}
		default:
			return state
	}
}