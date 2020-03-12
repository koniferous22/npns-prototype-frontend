import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { problemPageActions } from '../../../actions/content/problemPage'

import MyEditor from '../../form/MyEditor'
import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(problemPageActions.edit({edit: values.edit, contentId: props.contentId}, props.token))
} 

let EditForm = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<p>Keep in mind that updating only adds new content, deleting content is not allowed.</p>
				<Field name="edit" component={MyEditor} />
			</div>
			<Button type="submit">Submit</Button>
		</form>
	)
}

EditForm = reduxForm({
	form: 'edit',
	onSubmit: submit,
})(EditForm)

export default EditForm
