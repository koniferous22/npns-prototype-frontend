import React from 'react';
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { confirmPasswordChangeActions } from '../../../actions/content/confirm/passwordChange'
import { signupActions } from '../../../actions/content/signup'

import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(confirmPasswordChangeActions.confirm(props.token, values.password))
}

const validate = values => {
	const errors = {}
	if (!values.password) {
		errors.password = 'Required'
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = 'Required'
	}
	if (values.confirmPassword !== values.password) {
		errors.confirmPassword = 'Passwords don\'t match'
	}
	return errors
}

const PasswordChangeForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
			<Field name="password" component={renderField} type="password" label="Password (at least 8 characters)"/>
			<Field name="confirmPassword" component={renderField} type="password" label="Confirm password"/>
		<Button type="submit">Submit</Button>
	</form>)
}

const asyncBlurFields = ['password']

export default reduxForm({
	form: 'form',
	validate,
	asyncValidate: (values, dispatch, props, blurredField) => signupActions.validateField(values, blurredField),
	asyncBlurFields,
	onSubmit: submit,
	getFormState: ({content}) => content.confirm.passwordChange.form
})(PasswordChangeForm)