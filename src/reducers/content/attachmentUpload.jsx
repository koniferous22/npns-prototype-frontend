import { attachmentUploadConstants } from '../../constants/content/attachmentUpload'


const initialState = {
	urls: []
}

const attachmentUploadReducer = (state = initialState, action) => {
	switch (action.type) {
		case attachmentUploadConstants.SAVE_URL_REQUEST:
			return {message: "Saving URL"}
		case attachmentUploadConstants.SAVE_URL_SUCCESS:
			return {urls: action.urls,	message: "URL saved"}
		case attachmentUploadConstants.SAVE_URL_FAILED:
			return {message: action.error}
		case attachmentUploadConstants.RESET:
			return initialState
		default:
			return state
	}
}

export default attachmentUploadReducer
