import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { replySubmission } from '../../../store/content/problemPage'

import Button from '../../../styled-components/defaults/Button'
import renderTextArea from '../../form/RenderTextArea'

const submit = (values, dispatch, props) => {
	dispatch(replySubmission({content: values.content, submission: props.submission, problem: props.problem}, props.token))
}

let PostReplyForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<Field name="content" component={renderTextArea} type="text"/>
		</div>
		<Button type="submit">Submit</Button>
	</form>)
}

PostReplyForm = reduxForm({
	form: 'reply',
	onSubmit: submit,
	getFormState: ({content}) => content.problemPage.form
})(PostReplyForm)

export default PostReplyForm