import React from 'react'
import { submitProblemActions } from '../../../actions/content/submitProblemPage'
import { Field, reduxForm } from 'redux-form'

let submit = (values, dispatch, props) => {
	dispatch(submitProblemActions.submit({
		queue_name: props.queue,
		submitted_by: props.userId,
		title: values.title,
		content: values.description
	},
			props.token
			)
		)
}

let SubmitProblemForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<label htmlFor="title">Title</label>
			<Field name="title" component="input" type="text" />
		</div>
		<div>
			<label htmlFor="description">Description</label>
			<Field name="description" component="input" type="text" />
		</div>
		<button type="submit">Submit</button>
	</form>)
}

SubmitProblemForm = reduxForm({
	form: 'form',
	onSubmit: submit
})(SubmitProblemForm)

export default SubmitProblemForm
