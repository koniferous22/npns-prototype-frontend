import React from 'react';
import { connect } from 'react-redux';

import MarkdownRender from '../../form/MarkdownRender'
import PostSubmissionForm from './PostSubmissionForm'
import AttachmentUpload from '../../upload/AttachmentUpload'
import { problemPageActions } from '../../../actions/content/problemPage'

const mapStateToProps = (state, ownProps) => {
	if (!state.content.problemPage.form.submission) {
		return {
		attachmentUpload: state.content.attachmentUpload,
		...ownProps
		}
	}
	return {
		form: state.content.problemPage.form.submission,
		attachmentUpload: state.content.attachmentUpload,
		...ownProps
	}
}
const mapDispatchToProps = (dispatch, ownProps) => ({
	postSubmission: (submission, token) => dispatch(problemPageActions.postSubmission(submission, token))
})

class PostSubmissionComponent extends React.Component {
	render() {
		console.log(this.props)
		const token = this.props.token
		const sForm = this.props.form
		const problemId = this.props.problemId
		return (
			<div>
				<PostSubmissionForm token={token} problem={problemId} attachmentUrls={this.props.attachmentUpload.urls} />
				{
					sForm && sForm.values && (
						<div>
							{(sForm.values.content) && <p>Preview</p>}
							<MarkdownRender source={sForm.values.content} />
						</div>
					)
				}
				<AttachmentUpload />
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostSubmissionComponent)
