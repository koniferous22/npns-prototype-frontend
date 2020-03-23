const SAVE_URL = 'ATTACHMENT_UPLOAD_SAVE_URL_REQUEST';
const RESET = 'ATTACHMENT_UPLOAD_RESET';

const initialState = {
	urls: []
}

export default function attachmentUploadReducer(state = initialState, action) {
	switch (action.type) {
		case SAVE_URL:
			return {urls: action.urls,	message: "URL saved"}
		case RESET:
			return initialState
		default:
			return state
	}
}


export const saveUrls = (urls) => ({
	type: SAVE_URL,
	urls
})

export const reset = () => ({ type: RESET })
