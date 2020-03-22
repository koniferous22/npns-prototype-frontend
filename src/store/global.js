import { globalConstants } from '../constants/global'
import { fetchData } from '../utils'

const HIERARCHY_LOAD_REQUEST = 'GLOBAL_HIERARCHY_LOAD';
const HIERARCHY_LOAD_SUCCESS = 'GLOBAL_HIERARCHY_LOAD_SUCCESS';
const HIERARCHY_LOAD_FAILED = 'GLOBAL_HIERARCHY_LOAD_FAILED';
const LIN_QUEUES_LOAD_REQUEST = 'GLOBAL_LIN_QUEUES_LOAD';
const LIN_QUEUES_LOAD_SUCCESS = 'GLOBAL_LIN_QUEUES_LOAD_SUCCESS';
const LIN_QUEUES_LOAD_FAILED = 'GLOBAL_LIN_QUEUES_LOAD_FAILED';
const LIN_QUEUES_DISPLAY = 'GLOBAL_LIN_QUEUES_DISPLAY';
const LIN_QUEUES_HIDE = 'GLOBAL_LIN_QUEUES_HIDE';
const THEMES_DISPLAY = 'GLOBAL_THEMES_DISPLAY';
const THEMES_HIDE = 'GLOBAL_THEMES_HIDE';
const SET_THEME = 'GLOBAL_SET_THEME'

// TODO migrate this to constants
export const themes = {
	tryhard: {
		label: 'Tryhard',
		textWhenSelected: 'Click here to pick a theme'
	},
	buzzfeed: {
		label: 'Buzzfeed',
		textWhenSelected: 'Choose theme'
	}
}

export const defaultTheme = 'buzzfeed'

const defaultHierarchy = {Index:{} }
const defaultLinQueues = ['Index']
const defaultState = {hierarchy: defaultHierarchy, linQueues: defaultLinQueues, theme:defaultTheme, linQueuesDisplayed: false, themesDisplayed: false, themes: themes}

export default function globalReducer(state = defaultState, action) {
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
			return (action.theme in themes) ? { ...state, theme: action.theme} : state
		default:
			return state
	}
}
export const hierarchy = () =>  {
	function request() { return { type: HIERARCHY_LOAD_REQUEST}}
	function success(hierarchy) { return { type: HIERARCHY_LOAD_SUCCESS, hierarchy} }
	function failed() { return { type: HIERARCHY_LOAD_FAILED } }

	return fetchData(
		'/queue/hierarchy',
		{
			method: 'GET',
			headers: {
				'Content-Type'  : 'application/json'
			}	
		},
		request,
		({ hierarchy }) => success(hierarchy),
		failed
	)
}

export const queues = () => {
	function request() { return { type: LIN_QUEUES_LOAD_REQUEST}}
	function success(queues) { return { type: LIN_QUEUES_LOAD_SUCCESS, queues} }
	function failed() { return { type: LIN_QUEUES_LOAD_FAILED } }	

	return fetchData(
		'/queue/all',
		{
			method: 'GET',
			headers: {
				'Content-Type'  : 'application/json'
			}	
		},
		request,
		({queues}) => success(queues.map(({name}) => name)),
		failed
	)
}

export const setTheme = (theme) => {
	return {
		type: SET_THEME,
		theme
	}
}

export const showLinQueues = () => {
	return {
		type: LIN_QUEUES_DISPLAY
	}
}

export const hideLinQueues = () => {
	return {
		type: LIN_QUEUES_HIDE
	}
}

export const showThemes = () => {
	return {
		type: THEMES_DISPLAY
	}
}

export const hideThemes = () => {
	return {
		type: THEMES_HIDE
	}
}
