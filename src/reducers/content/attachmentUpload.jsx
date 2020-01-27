import { attachmentUploadConstants } from '../../constants/content/attachmentUpload'


const initialState = {
	url: {}
}

const attachmentUploadReducer = (state = initialState, action) => {
	switch (action.type) {
		case attachmentUploadConstants.SAVE_URL_REQUEST:
			return {message: "Saving URL"}
		case attachmentUploadConstants.SAVE_URL_SUCCESS:
			return {url: action.url,	message: "URL saved"}
		case attachmentUploadConstants.SAVE_URL_FAILED:
			return {message: action.error}
		default:
			return state
	}
}

export default attachmentUploadReducer
