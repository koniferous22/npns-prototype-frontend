import { imageUploadConstants } from '../../constants/content/imageUpload'

function saveUrl(url) {
	return dispatch => {
		dispatch(request(url))
		dispatch(success(url))
		}

	function request() { return { type: imageUploadConstants.SAVE_URL_REQUEST } }
	function success(problem, queue) { return { type: imageUploadConstants.SAVE_URL_SUCCESS, url } }
}

export const imageUploadActions = {
  saveUrl
}
