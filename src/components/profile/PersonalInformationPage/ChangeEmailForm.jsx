import { Field, reduxForm } from 'redux-form'
import React from 'react'

let submit = (values, dispatch, props) => {
	//dispatch(authActions.login(values.username, values.password))
	console.log('Dispatching some shit')
}

let ChangeEmailForm = (props) => (
	<form onSubmit={props.handleSubmit}>
		<div>
			<label htmlFor="email">email</label>
			<Field name="email" component="input" type="text" />
		</div>
		{/*<div>
			<label htmlFor="email">Password</label>
			<Field name="password" component="input" type="password" />
		</div>-->*/}
		<button type="submit">Submit</button>
	</form>
)


ChangeEmailForm = reduxForm({
	form: 'form',
	onSubmit: submit,
	getFormState: ({content}) => content.login
})(ChangeEmailForm)

export default ChangeEmailForm;