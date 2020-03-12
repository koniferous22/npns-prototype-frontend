import React from 'react'

import MarkdownRender from '../../form/MarkdownRender'

class Edits extends React.Component {
	render() {
		const keys = Object.keys(this.props.edits)
		return(
			<div>
			{keys.map(k => (
				<div>
					UPDATE {new Date(this.props.edits[k].edited).toGMTString()}:
					<MarkdownRender source={this.props.edits[k].contents} />
				</div>
			))}
			</div>
		)
	}
}

export default Edits
