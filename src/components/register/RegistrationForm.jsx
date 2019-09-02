import React from 'react'
import { registrationActions } from '../../actions/registration'
import { Field, reduxForm } from 'redux-form'

let submit = (values, dispatch, props) => {
    dispatch(registrationActions.signup({
    	username: values.username,
    	password: values.password,
    	email: values.email,
    	firstName: values.firstName,
    	lastName: values.lastName
    }))
}

let RegistrationForm = props => {
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
        <div>
            <label htmlFor="email">E-mail</label>
            <Field name="email" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component="input" type="text" />
        </div>
        <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component="input" type="text" />
        </div>
        <button type="submit">Submit</button>
    </form>)
}

RegistrationForm = reduxForm({
    form: 'registration',
    onSubmit: submit
})(RegistrationForm)

export default RegistrationForm
