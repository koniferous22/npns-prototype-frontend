import React from 'react'
import { authActions } from '../../actions/auth'
import { Field, reduxForm } from 'redux-form'

import renderField from '../form/RenderField'

import LoginButton from '../../styled-components/defaults/StyledButton'

let submit = (values, dispatch, props) => {
	dispatch(authActions.login(values.username, values.password))
}

let LoginForm = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<Field name="username" component={renderField} type="text" label='Username' />
			<Field name="password" component={renderField} type="password" label='Password'/>
			<LoginButton type="submit">Submit</LoginButton>
		</form>
	)
}


LoginForm = reduxForm({
	form: 'form',
	onSubmit: submit,
	getFormState: ({content}) => content.login
})(LoginForm)

export default LoginForm
