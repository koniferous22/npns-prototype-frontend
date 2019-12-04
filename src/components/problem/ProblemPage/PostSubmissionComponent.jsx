import React from 'react';
import { connect } from 'react-redux';

import MarkdownRender from '../../form/MarkdownRender'
import PostSubmissionForm from './PostSubmissionForm'
import { problemPageActions } from '../../../actions/content/problemPage'

const mapStateToProps = (state, ownProps) => ({
	...state.content.problemPage.form,
	...ownProps
})
const mapDispatchToProps = (dispatch, ownProps) => ({
	postSubmission: (submission, token) => dispatch(problemPageActions.postSubmission(submission, token))
})

class PostSubmissionComponent extends React.Component {
	render() {
		const token = this.props.token
		const sForm = this.props.submission
		const submissionForm = this.props.submissionForm
		const problemId = this.props.problemId
		return (
			<div>
				{
					submissionForm && <PostSubmissionForm token={token} problem={problemId} />
				}
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
