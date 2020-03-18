import { globalConstants } from '../constants/global'
import { appConfig } from '../appConfig'

export const hierarchy = () => {
	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/queue/hierarchy", {
			method: 'GET',
			headers: {
				'Content-Type'  : 'application/json'
			}
			
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response;
				throw error;
			}
		}).then(response => {
			return response.json()
		}).then(response => { 
			dispatch(success(response.hierarchy))
		}
		).catch(error => {
			dispatch(failed())
		})
	}

	function request() { return { type: globalConstants.HIERARCHY_LOAD_REQUEST}}
	function success(hierarchy) { return { type: globalConstants.HIERARCHY_LOAD_SUCCESS, hierarchy} }
	function failed() { return { type: globalConstants.HIERARCHY_LOAD_FAILED } }
}

export const queues = () => {
	return dispatch => {
		dispatch(request())
		fetch(appConfig.backendUrl + "/queue/all", {
			method: 'GET',
			headers: {
				'Content-Type'  : 'application/json'
			}
			
		}).then(response => {
			if (response.status >= 200 && response.status < 400) {
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response;
				throw error;
			}
		}).then(response => {
			return response.json()
		}).then(response => { 
			dispatch(success(response.queues.map(q => q.name)))
		}
		).catch(error => {
			dispatch(failed())
		})
	}

	function request() { return { type: globalConstants.LIN_QUEUES_LOAD_REQUEST}}
	function success(queues) { return { type: globalConstants.LIN_QUEUES_LOAD_SUCCESS, queues} }
	function failed() { return { type: globalConstants.LIN_QUEUES_LOAD_FAILED } }	
}

export const setTheme = (theme) => {
	return {
		type: globalConstants.SET_THEME,
		theme
	}
}

export const showLinQueues = () => {
	return {
		type: globalConstants.LIN_QUEUES_DISPLAY
	}
}

export const hideLinQueues = () => {
	return {
		type: globalConstants.LIN_QUEUES_HIDE
	}
}

export const showThemes = () => {
	return {
		type: globalConstants.THEMES_DISPLAY
	}
}

export const hideThemes = () => {
	return {
		type: globalConstants.THEMES_HIDE
	}
}

export const globalActions = {
	hierarchy,
	queues,
	setTheme,
	showLinQueues,
	hideLinQueues,
	showThemes,
	hideThemes
}