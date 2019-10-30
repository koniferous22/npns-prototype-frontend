import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { problemPageActions } from '../../../actions/content/problemPage'

const submit = (values, dispatch, props) => {
	dispatch(problemPageActions.replySubmission({content: values.content, submission: props.submission, problem: props.problem}, props.token))
}

let PostReplyForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<Field name="content" component="input" type="text" />
		</div>
		<button type="submit">Submit</button>
	</form>)
}

PostReplyForm = reduxForm({
	form: 'reply',
	onSubmit: submit,
	getFormState: ({content}) => content.problemPage.form
})(PostReplyForm)

export default PostReplyForm