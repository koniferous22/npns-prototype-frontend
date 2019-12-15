import React from 'react';
import { connect } from 'react-redux';

import MarkdownRender from '../../form/MarkdownRender'
import PostSubmissionForm from './PostSubmissionForm'
import { problemPageActions } from '../../../actions/content/problemPage'

const mapStateToProps = (state, ownProps) => {
	if (!state.content.problemPage.form.submission) {
		return ownProps
	}
	return {
		form: state.content.problemPage.form.submission,
		...ownProps
	}
}
const mapDispatchToProps = (dispatch, ownProps) => ({
	postSubmission: (submission, token) => dispatch(problemPageActions.postSubmission(submission, token))
})

class PostSubmissionComponent extends React.Component {
	render() {
		const token = this.props.token
		const sForm = this.props.form
		const problemId = this.props.problemId
		return (
			<div>
				<PostSubmissionForm token={token} problem={problemId} />
				{
					sForm && sForm.values && (
						<div>
							{(sForm.values.content) && <p>Preview</p>}
							<MarkdownRender source={sForm.values.content} />
						</div>
					)
				}
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PostSubmissionComponent)
