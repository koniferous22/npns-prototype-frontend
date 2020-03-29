import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { filled } from '../../../store/content/profile/personalInformationPage'
import { validateField } from '../../../store/content/signUpPage'

import Button from '../../../styled-components/defaults/Button'

const validate = values => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	}
	return errors
}

const submit = (values, dispatch, props) => {
	dispatch(filled('email',values))
}

let ChangeEmailForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		Change Email	
		<Field name="email" component={renderField} type="text" placeholder="New Email"/>
		<Button type="submit">Submit</Button>
	</form>
)


ChangeEmailForm = reduxForm({
	form: 'changeEmail',
	validate,
	onSubmit: submit,
	asyncBlurFields: ['email'],
	asyncValidate: (values, dispatch, props, blurredField) => validateField(values, blurredField),
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangeEmailForm)

export default ChangeEmailForm;