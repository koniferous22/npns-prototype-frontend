import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { forgotPwd } from '../../store/content/forgotPwdPage'

import renderField from '../form/RenderField'

import Button from '../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(forgotPwd(values.identifier))
}

const ForgotPasswordForm = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<Field name="identifier" component={renderField} type="text" label='Username or Email' alignLeft/>
			<Button type="submit">Send pwd reset link</Button>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	onSubmit: submit,
	getFormState: ({content}) => content.submitProblem.form
})(ForgotPasswordForm)