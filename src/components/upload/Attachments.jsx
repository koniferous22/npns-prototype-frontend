import React from 'react'
import ShowAttachment from './ShowAttachment'

const Attachments = ({attachmentUrls}) => {
	return (
		<div>
			{attachmentUrls.map((u, i) => <ShowAttachment key={i} attachmentUrl={u} />)}
		</div>
	)
}

export default Attachments
