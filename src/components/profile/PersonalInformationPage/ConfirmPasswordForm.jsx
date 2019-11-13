import { Field, reduxForm } from 'redux-form'
import React from 'react'

import renderField from '../../form/RenderField'
import { personalInformationPageActions } from '../../../actions/content/profile/personalInformationPage'

import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(personalInformationPageActions.confirmPassword(values.password, props.form, props.token))
}

let ConfirmPasswordForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			<Field name="password" component={renderField} type="password" label="Password"/>
		</div>
		<Button type="submit">Submit</Button>
	</form>
)


ConfirmPasswordForm = reduxForm({
	form: 'confirmPassword',
	onSubmit: submit,
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ConfirmPasswordForm)

export default ConfirmPasswordForm;