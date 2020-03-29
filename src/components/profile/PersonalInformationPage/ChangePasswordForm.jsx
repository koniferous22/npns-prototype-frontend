import React from 'react'
import { reduxForm } from 'redux-form'

import { filled } from '../../../store/content/profile/personalInformationPage'

import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(filled('password',values))
}

let ChangePasswordForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			Password reset - email with a link will be sent
		</div>
		<Button type="submit">Send password reset link</Button>
	</form>
)
ChangePasswordForm = reduxForm({
	form: 'changePassword',
	onSubmit: submit,
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangePasswordForm)

export default ChangePasswordForm