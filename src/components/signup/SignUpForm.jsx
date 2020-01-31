import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../form/RenderField'
import { signupActions } from '../../actions/content/signup'

import FormButton from '../../styled-components/form/FormButton'

const submit = (values, dispatch, props) => {
	dispatch(signupActions.signup(values))
}

const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Required'
	}
	if (!values.password) {
		errors.password = 'Required'
	}
	if (!values.email) {
		errors.email = 'Required'
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = 'Required'
	}
	if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'Passwords don\'t match'
	}
	return errors
}

const asyncBlurFields = ['username', 'password', 'email', 'referred_by']

const SignUpForm = props => {
	const { handleSubmit } = props
	return (
		<form onSubmit={handleSubmit}>
			<Field name="username" component={renderField} type="text" label="Username" alignLeft/>
			<Field name="password" component={renderField} type="password" label="Password" placeholder="at least 8 characters" alignLeft/>
			<Field name="confirmPassword" component={renderField} type="password" label="Confirm password" alignLeft/>
			<Field name="email" component={renderField} type="text" label="Email" alignLeft/>
			<Field name="firstName" component={renderField} type="text" label="First Name" alignLeft/>
			<Field name="lastName" component={renderField} type="text" label="Last Name" alignLeft/>
			<Field name="referred_by" component={renderField} type="text" label="Referred by" alignLeft/>
			<FormButton type="submit" alignLeft>Submit</FormButton>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	validate,
	asyncValidate: (values, dispatch, props, blurredField) => signupActions.validateField(values, blurredField),
	asyncBlurFields,
	onSubmit: submit,
	getFormState: ({content}) => content.signup.form
})(SignUpForm)
