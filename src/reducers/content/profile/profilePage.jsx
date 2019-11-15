import { profilePageConstants } from '../../../constants/content/profile/profilePage'

const defaultState = {
	data: {
		firstName: "",
		lastName: "",
		email: "",
		problem_count: 0,
		submission_count: 0,
		reply_count: 0,
		balances: {}
	}
}

function profilePageReducer(state=defaultState, action) {
	switch(action.type) {
		case profilePageConstants.LOAD_USER_REQUEST:
			return {...state, message: "Loading data", messageType: action.messageType}
		case profilePageConstants.LOAD_USER_SUCCESS:
			return {data: action.user || defaultState.data}
		case profilePageConstants.LOAD_USER_FAILED:
			return {...state, message: "No user found", messageType: action.messageType}
		default:
			return state
	}
}

export default profilePageReducer
