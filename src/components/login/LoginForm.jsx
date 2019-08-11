import React from 'react'
import { userActions } from '../../actions/user-actions'
import { Field, reduxForm } from 'redux-form'

let submit = (values, dispatch, props) => {
	dispatch(userActions.login(values.username,values.password))
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
			<Field name="password" component="input" type="text" />
		</div>
		<button type="submit">Submit</button>
	</form>)
}


LoginForm = reduxForm({
	form: 'login',
	onSubmit: submit,
})(LoginForm)

export default LoginForm
