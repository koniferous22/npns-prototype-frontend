import React from 'react'
import { connect } from 'react-redux'

import { attachmentUploadActions } from '../../actions/content/attachmentUpload'

import Attachments from './Attachments'

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUrls: (urls) => dispatch(attachmentUploadActions.saveUrls(urls))
})

class ImageUpload extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			urls: []
		}
	}
	showWidget = () => {
		let widget = window.cloudinary.createUploadWidget({ 
			uploadPreset: 'lz6m2dte'}, 
		(error, result) => {
			if (!error && result && result.event === "success") { 
			let a = this.state.urls.slice()
			a.push(result.info.url)
			this.setState({urls: a})
			this.props.saveUrls(this.state.urls)
		}})
		widget.open()
	}
	render() {
		return (
			<div>
				<button onClick={this.showWidget}> Upload attachment </button>
				{this.state.urls && <Attachments attachmentUrls={this.state.urls} />}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
