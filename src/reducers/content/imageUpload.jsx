import { imageUploadConstants } from '../../constants/content/imageUpload'


const initialState = {
	url: {}
}

const imageUploadReducer = (state = initialState, action) => {
	switch (action.type) {
		case imageUploadConstants.SAVE_URL_REQUEST:
			return {message: "Saving URL"}
		case imageUploadConstants.SAVE_URL_SUCCESS:
			return {url: action.url,	message: "URL saved"}
		case imageUploadConstants.SAVE_URL_FAILED:
			return {message: action.error}
		default:
			return state
	}
}

export default imageUploadReducer
