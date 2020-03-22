import React from 'react'

import MarkdownRender from '../../form/MarkdownRender'

const Edits = ({ edits }) => {
	const keys = Object.keys(edits)
	return(
		<div>
		{keys.map((k, i) => (
			<div key={i} >
				UPDATE {new Date(edits[k].edited).toGMTString()}:
				<MarkdownRender source={edits[k].contents} />
			</div>
		))}
		</div>
	)
}

export default Edits
