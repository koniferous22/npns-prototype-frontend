import React from 'react'
import ForgotPasswordForm from './ForgotPasswordForm'
import { Field, reduxForm } from 'redux-form'

const submit = (values, dispatch, props) => {
	console.log(values.identifier)
}

const ForgotPassword = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="identifier">Username or Email</label>
				<Field name="identifier" component="input" type="text" />
			</div>
			<button type="submit">Send pwd reset link</button>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	onSubmit: submit,
	getFormState: ({content}) => content.forgotPassword
})(ForgotPassword)