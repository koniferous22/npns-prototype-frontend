import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { personalInformationPageActions } from '../../../actions/content/profile/personalInformationPage'
import { signupActions } from '../../../actions/content/signup'

import Button from '../../../styled-components/defaults/Button'

const validate = values => {
	const errors = {}
	if (!values.email) {
		errors.email = 'Required'
	}
	return errors
}

const submit = (values, dispatch, props) => {
	dispatch(personalInformationPageActions.filled('email',values))
}

let ChangeEmailForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			<Field name="email" component={renderField} type="text" label="Email"/>
		</div>
		<Button type="submit">Submit</Button>
	</form>
)


ChangeEmailForm = reduxForm({
	form: 'changeEmail',
	validate,
	onSubmit: submit,
	asyncBlurFields: ['email'],
	asyncValidate: (values, dispatch, props, blurredField) => signupActions.validateField(values, blurredField),
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangeEmailForm)

export default ChangeEmailForm;