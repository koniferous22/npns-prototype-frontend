import React from 'react'
import { reduxForm } from 'redux-form'

import { personalInformationPageActions } from '../../../actions/content/profile/personalInformationPage'

import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(personalInformationPageActions.filled('password',values))
}

let ChangePasswordForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			Email containing password reset link will be sent
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