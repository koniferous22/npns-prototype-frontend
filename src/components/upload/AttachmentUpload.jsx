import React from 'react'
import { connect } from 'react-redux'

import { attachmentUploadActions } from '../../actions/content/attachmentUpload'

import ShowAttachment from './ShowAttachment'

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUrl: (url) => dispatch(attachmentUploadActions.saveUrl(url))
})

class ImageUpload extends React.Component {
	constructor(props){
		super(props)
		this.state = {}
	}
	showWidget = () => {
		let widget = window.cloudinary.createUploadWidget({ 
			uploadPreset: 'lz6m2dte'}, 
		(error, result) => {
			if (!error && result && result.event === "success") { 
			this.setState({url: result.info.url})
			this.props.saveUrl(result.info.url)
		}})
		widget.open()
	}
	render() {
		return (
			<div>
				<button onClick={this.showWidget}> Upload attachment </button>
				{this.state.url && <ShowAttachment attachmentUrl={this.state.url} />}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
