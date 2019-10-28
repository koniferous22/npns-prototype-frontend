import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { personalInformationPageActions } from '../../../actions/content/profile/personalInformationPage'
import { signupActions } from '../../../actions/content/signup'

const validate = values => {
	const errors = {}
	if (!values.username) {
		errors.username = 'Required'
	}
	return errors
}

const submit = (values, dispatch, props) => {
	dispatch(personalInformationPageActions.filled('username',values))
}

let ChangeUsernameForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			<Field name="username" component={renderField} type="text" label="Username"/>
		</div>
		<button type="submit">Submit</button>
	</form>
)

ChangeUsernameForm = reduxForm({
	form: 'changeUsername',
	validate,
	onSubmit: submit,
	asyncBlurFields: ['username'],
	asyncValidate: (values, dispatch, props, blurredField) => signupActions.validateField(values, blurredField),
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangeUsernameForm)

export default ChangeUsernameForm