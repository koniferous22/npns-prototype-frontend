import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { filled } from '../../../store/content/profile/personalInformationPage'
import { validateField } from '../../../store/content/signUpPage'

import Button from '../../../styled-components/defaults/Button'

const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Required'
	}
	return errors
}

const submit = (values, dispatch, props) => {
	dispatch(filled('username',values))
}

let ChangeUsernameForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		Change Username
		<div>
			<Field name="username" component={renderField} type="text" placeholder="New username"/>
		</div>
		<Button type="submit">Submit</Button>
	</form>
)

ChangeUsernameForm = reduxForm({
	form: 'changeUsername',
	validate,
	onSubmit: submit,
	asyncBlurFields: ['username'],
	asyncValidate: (values, dispatch, props, blurredField) => validateField(values, blurredField),
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangeUsernameForm)

export default ChangeUsernameForm