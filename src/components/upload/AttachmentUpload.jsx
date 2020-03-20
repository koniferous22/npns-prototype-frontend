import React, { useState, useEffect } from 'react'
/*import { connect } from 'react-redux'*/
import { useDispatch } from 'react-redux'

import { attachmentUploadActions } from '../../actions/content/attachmentUpload'

import Attachments from './Attachments'

/*const mapStateToProps = state => state*/

/*const mapDispatchToProps = (dispatch, ownProps) => ({
	saveUrls: (urls) => dispatch(attachmentUploadActions.saveUrls(urls)),
	reset: () => dispatch(attachmentUploadActions.reset())
})*/

/*class ImageUpload extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			urls: []
		}
	}
	componentWillUnmount() {
		this.props.reset()
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
}*/

const ImageUpload = () => {
	const [urls, setUrls] = useState([])
	const dispatch = useDispatch()

	useEffect(() => {
		console.log('componentDidMount');
		console.log('AAAAAAA');

		return () => {
				console.log('componentWillUnmount');
		console.log('AAAAAAA');
		};
	}, []);

	const showWidget = () => {
		let widget = window.cloudinary.createUploadWidget({ 
			uploadPreset: 'lz6m2dte'}, 
		(error, result) => {
			if (!error && result && result.event === "success") { 
			setUrls(urls.concat(result.info.url))
			dispatch(attachmentUploadActions.saveUrls(urls))
		}})
		widget.open()
	}
	return(
		<div>
			<button onClick={showWidget}> Upload attachment </button>
			{urls && <Attachments attachmentUrls={urls} />}
		</div>
	)
}
/*	componentWillUnmount() {
		this.props.reset()
	}*/

/*export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload)*/
export default ImageUpload
