import { problemPageConstants } from '../../constants/content/problemPage'

const initialState = {}

const editReducer = (state = initialState, action) => {
	switch (action.type) {
		case problemPageConstants.EDIT_REQUEST:
			return {message: "Submitting edit"}
		case problemPageConstants.EDIT_SUCCESS:
			return {message: "Edit submitted", messageType: action.messageType, edit: action.edit, editFormSubmitted: true}
		case problemPageConstants.EDIT_FAILED:
			return {message: action.error, messageType: action.messageType}
		default:
			return state
	}
}

export default editReducer
