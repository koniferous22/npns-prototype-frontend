import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { attachmentUploadActions } from '../../actions/content/attachmentUpload'

import Attachments from './Attachments'

const AttachmentUpload = () => {
	const [urls, setUrls] = useState([])
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(attachmentUploadActions.reset())
		};
	}, [dispatch]);

	const showWidget = () => {
		let widget = window.cloudinary.createUploadWidget({ 
			uploadPreset: 'lz6m2dte'}, 
		(error, result) => {
			if (!error && result && result.event === "success") { 
			setUrls(urls.concat(result.info.url))
			dispatch(attachmentUploadActions.saveUrls(urls))
		}})
		widget.open()
	}
	return(
		<div>
			<button onClick={showWidget}> Upload attachment </button>
			{urls && <Attachments attachmentUrls={urls} />}
		</div>
	)
}

export default AttachmentUpload
