import { queueConstants } from "../constants/queue-constants"

export function getAllQueues(state = {queueList: []}, action) {
	switch (action.type) {
		case queueConstants.QUEUE_GET_ALL:
			return { queueList: action.queueList };
		default:
			return state
	}
}