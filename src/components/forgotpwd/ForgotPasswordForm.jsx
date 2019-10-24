import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { forgotPwdActions } from '../../actions/content/forgotPwdPage'


const submit = (values, dispatch, props) => {
	dispatch(forgotPwdActions.forgotPwd(values.identifier))
}

const ForgotPasswordForm = props => {
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
	getFormState: ({content}) => content.submitProblem.form
})(ForgotPasswordForm)