import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { personalInformationPageActions } from '../../../actions/content/profile/personalInformationPage'
import { signupActions } from '../../../actions/content/signup'

const submit = (values, dispatch, props) => {
	dispatch(personalInformationPageActions.filled('names',values))
}

let ChangeNamesForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			<Field name="firstName" component={renderField} type="text" label="First Name"/>
			<Field name="lastName" component={renderField} type="text" label="Last Name"/>
		</div>
		<button type="submit">Submit</button>
	</form>
)

ChangeNamesForm = reduxForm({
	form: 'changeNames',
	onSubmit: submit,
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangeNamesForm)

export default ChangeNamesForm