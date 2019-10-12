import profilePageConstants from '../../../constants/content/profile/profilePage'

const defaultState = {

}

function profilePageReducer(state=defaultState, action) {
	switch(action.type) {
		case profilePageConstants.LOAD_USER_REQUEST:
		case profilePageConstants.LOAD_USER_SUCCESS:
		case profilePageConstants.LOAD_USER_FAILED:
		default:
			return state
	}
}