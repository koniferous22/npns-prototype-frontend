import { appConfig } from '../appConfig'
import { queueConstants } from "../constants/queue-constants"

export const queueActions = {
	getListOfQueues
}

function getListOfQueues() {
	return dispatch => {
		fetch(appConfig.backendUrl + "/queue/all", {
			method: 'GET'
		}).then(response => {
			if (response.status < 400) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
		}).then(response => response.json())
		.then(qList => {
            console.log(qList)
            dispatch(success(qList))
        }).catch(error => {
            console.log("Exception my friend")
            console.log(error)
        })
	}

    function success(qList) { return { type: queueConstants.QUEUE_GET_ALL, queueList: qList } }
    
}
