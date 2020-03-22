import { messageType } from '../../../constants/misc/backendMessageTypes'

import { fetchData } from '../../../utils'

const LOAD_USER_REQUEST = 'PROFILE_PAGE_LOAD_USER_REQUEST'
const LOAD_USER_SUCCESS = 'PROFILE_PAGE_LOAD_USER_SUCCESS'
const LOAD_USER_FAILED = 'PROFILE_PAGE_LOAD_USER_FAILED'

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

export default function profilePageReducer(state=defaultState, action) {
	switch(action.type) {
		case LOAD_USER_REQUEST:
			return {...state, message: "Loading data", messageType: action.messageType}
		case LOAD_USER_SUCCESS:
			return {data: action.user || defaultState.data}
		case LOAD_USER_FAILED:
			return {...state, message: "No user found", messageType: action.messageType}
		default:
			return state
	}
}

export const loadUserData = (username) => {
	
	const request = () => ({ type: LOAD_USER_SUCCESS })
	const success = (user) => ({type: LOAD_USER_SUCCESS, user})
	const failure = (message) => ({type: LOAD_USER_FAILED, message, messageType: messageType.ERROR})

	if (!username || username === '') {
		return failure('No username specified')
	}

	return fetchData(
		"/u/" + username,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		},
		request,
		success,
		failure
	)
}
