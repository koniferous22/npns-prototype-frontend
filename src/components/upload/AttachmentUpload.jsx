import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { saveUrls, reset } from '../../store/content/attachmentUpload'

import Attachments from './Attachments'

const ImageUpload = () => {
	const [urls, setUrls] = useState([])
	const dispatch = useDispatch()
	useEffect(() => {
		return () => {
			dispatch(reset())
		}
	}, [dispatch])
	const onClick = () => {
		let widget = window.cloudinary.createUploadWidget(
			{ 
				uploadPreset: 'lz6m2dte'
			}, 
			(error, result) => {
				if (!error && result && result.event === "success") { 
					const newUrls = [...urls, result.info.url]
					dispatch(saveUrls(newUrls))
					setUrls(newUrls)
				}
			}
		)
		widget.open()
	}
	
	return(
		<div>
			<button onClick={onClick}> Upload attachment </button>
			{urls && <Attachments attachmentUrls={urls} />}
		</div>
	)
}

export default ImageUpload
