import React from 'react'

class ShowAttachment extends React.Component {
	render() {
		const attachmentUrl = this.props.attachmentUrl
		var attachmentName = ''
		if (attachmentUrl) {
			const urlArray = attachmentUrl.split('/')
			attachmentName = urlArray[urlArray.length -1]
		}
		return (
			<div>
				{
					(attachmentUrl) ?
						((attachmentUrl.match(/.(jpg|jpeg|png|gif|bmp|ico|svg)$/i)) ?
							(<img src={attachmentUrl} alt="attachment" />) 
							: 
							(<a href={attachmentUrl}>{attachmentName}</a>)) 
						:
						<p>No attachments</p>}
			</div>
		)
	}
}

export default ShowAttachment 
