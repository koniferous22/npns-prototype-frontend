import React from 'react'
import { authActions } from '../../actions/auth'
import { Field, reduxForm } from 'redux-form'

let submit = (values, dispatch, props) => {
	dispatch(authActions.login(values.username, values.password))
}

let LoginForm = props => {
	const { handleSubmit } = props;
	return (<form onSubmit={handleSubmit}>
		<div>
			<label htmlFor="username">Username</label>
			<Field name="username" component="input" type="text" />
		</div>
		<div>
			<label htmlFor="password">Password</label>
			<Field name="password" component="input" type="password" />
		</div>
		<button type="submit">Submit</button>
	</form>)
}


LoginForm = reduxForm({
	form: 'form',
	onSubmit: submit,
	getFormState: ({content}) => content.login
})(LoginForm)

export default LoginForm
