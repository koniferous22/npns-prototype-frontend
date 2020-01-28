import React from 'react'
import ShowAttachment from './ShowAttachment'

class Attachments extends React.Component {
	render() {
		const attachmentUrls = this.props.attachmentUrls
		return (
			<div>
				{attachmentUrls.map(u => <ShowAttachment attachmentUrl={u} />)}
			</div>
		)
	}
}

export default Attachments
