import { attachmentUploadConstants } from '../../constants/content/attachmentUpload'

function saveUrl(url) {
	return dispatch => {
		dispatch(request(url))
		dispatch(success(url))
		}

	function request() { return { type: attachmentUploadConstants.SAVE_URL_REQUEST } }
	function success(url) { return { type: attachmentUploadConstants.SAVE_URL_SUCCESS, url } }
}

export const attachmentUploadActions = {
  saveUrl
}
