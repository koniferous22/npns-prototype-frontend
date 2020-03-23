import React from 'react'

const ShowAttachment = ({ attachmentUrl }) => {
	var attachmentName = ''
	if (attachmentUrl) {
		const urlArray = attachmentUrl.split('/')
		attachmentName = urlArray[urlArray.length - 1]
		var isImage = Boolean(attachmentUrl.match(/.(jpg|jpeg|png|gif|bmp|ico|svg)$/i))
		if (isImage) {
			urlArray[urlArray.length - 2] = 'w_250,c_lfill'
			var previewUrl = urlArray.join('/')
		}
	}
	return (
		<div>
			{
				attachmentUrl 
					? (
						isImage
							? <a href={attachmentUrl}><img src={previewUrl} alt="attachment" /></a>
							: <a href={attachmentUrl}>{attachmentName}</a>
					)
					: <p>No attachments</p>
			}
		</div>
	)
};

export default ShowAttachment 
