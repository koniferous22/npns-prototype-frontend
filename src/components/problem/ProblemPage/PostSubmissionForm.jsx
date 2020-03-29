import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { postSubmission } from '../../../store/content/problemPage'

import MyEditor from '../../form/MyEditor'
import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(postSubmission({content: values.content, problem: props.problem, attachmentUrls: props.attachmentUrls}, props.token))
}

let PostSubmissionForm = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<h4>Post your submission here!</h4>
				<Field name="content" component={MyEditor} />
			</div>
			<Button type="submit">Submit</Button>
		</form>
	)
}

PostSubmissionForm = reduxForm({
	form: 'submission',
	onSubmit: submit,
	getFormState: ({content}) => content.problemPage.form
})(PostSubmissionForm)

export default PostSubmissionForm
