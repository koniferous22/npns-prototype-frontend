import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { problemPageActions } from '../../../actions/content/problemPage'

import Button from '../../../styled-components/defaults/Button'

import MyEditor from '../../form/MyEditor'
import renderTextArea from '../../form/RenderTextArea'

const submit = (values, dispatch, props) => {
	
	dispatch(problemPageActions.postSubmission({content: values.content, problem: props.problem}, props.token))
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
