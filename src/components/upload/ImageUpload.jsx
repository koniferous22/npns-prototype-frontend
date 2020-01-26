import React from 'react'
import { connect } from 'react-redux'

import { imageUploadActions } from '../../actions/content/imageUpload'

const mapStateToProps = state => state

const mapDispatchToProps = (dispatch, ownProps) => ({
  saveUrl: (url) => dispatch(imageUploadActions.saveUrl(url))
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
			this.setState({imgurl: result.info.url})
			this.props.saveUrl(result.info.url)
		}})
		widget.open()
	}
	render() {
		return (
			<div>
				<button onClick={this.showWidget}> Upload Image </button>
				{this.state.imgurl && <img src={this.state.imgurl} alt="attachment" />}
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)
