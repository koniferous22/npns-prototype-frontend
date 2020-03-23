import React from 'react'
import ShowAttachment from './ShowAttachment'

const Attachments = ({ attachmentUrls }) => (
	<>
		{
			attachmentUrls.map((u, i) => <ShowAttachment key={i} attachmentUrl={u} />)
		}
	</>
)

export default Attachments
