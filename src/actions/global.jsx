import { globalConstants } from '../constants/global'

export const globalActions = {
	setActiveQueue
}

function setActiveQueue(queue) {
	return {
		type: globalConstants.SET_ACTIVE_QUEUE,
		activeQueue: queue
	}
}

function hierarchy() {
	return dispatch => {
        dispatch(request())
        fetch(appConfig.backendUrl + "/hierarchy", {
            method: 'POST',
            headers: {
                'Content-Type'  : 'application/json'/*,
                'Authorization' : 'Bearer ' + token*/
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
            dispatch(success(response))
        }
        ).catch(error => {
            dispatch(failed())
        })
    }

	function request() { return { type: globalConstants.HIERARCHY_LOAD_REQUEST}}
    function success(hierarchy) { return { type: globalConstants.HIERARCHY_LOAD_SUCCESS, hierarchy} }
    function failed() { return { type: globalConstants.HIERARCHY_LOAD_FAILED } }
}