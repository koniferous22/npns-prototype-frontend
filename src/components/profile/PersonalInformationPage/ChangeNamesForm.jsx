import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../../form/RenderField'
import { filled } from '../../../store/content/profile/personalInformationPage'

import Button from '../../../styled-components/defaults/Button'

const submit = (values, dispatch, props) => {
	dispatch(filled('names',values))
}

let ChangeNamesForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			Change Names
			<Field name="firstName" component={renderField} type="text" placeholder="First Name"/>
			<Field name="lastName" component={renderField} type="text" placeholder="Last Name"/>
		</div>
		<Button type="submit">Submit</Button>
	</form>
)

ChangeNamesForm = reduxForm({
	form: 'changeNames',
	onSubmit: submit,
	getFormState: ({content}) => content.profile.personalInformationPage.form
})(ChangeNamesForm)

export default ChangeNamesForm