import { attachmentUploadConstants } from '../../constants/content/attachmentUpload'

function saveUrls(urls) {
	return dispatch => {
		dispatch(request(urls))
		dispatch(success(urls))
		}

	function request() { return { type: attachmentUploadConstants.SAVE_URL_REQUEST } }
	function success(urls) { return { type: attachmentUploadConstants.SAVE_URL_SUCCESS, urls } }
}

export const attachmentUploadActions = {
  saveUrls
}
