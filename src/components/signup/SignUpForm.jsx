import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../form/RenderField'
import { signupActions } from '../../actions/content/signup'

import { appConfig } from '../../appConfig'

const submit = (values, dispatch, props) => {
    dispatch(signupActions.signup(values))
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Required'
    }
    if (!values.password) {
        errors.password = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = 'Required'
    }
    if (values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords don\'t match'
    }
    return errors
}

const asyncBlurFields = ['username', 'password', 'email']

const asyncValidate = (values, dispatch, props, blurredField) => {
   if (!asyncBlurFields.includes(blurredField)) {
        return new Promise((resolve) => resolve())
   }
   return new Promise((resolve, reject) => {
        fetch(appConfig.backendUrl + "/u/available/" + blurredField, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({[blurredField]: values[blurredField]})
        }).then(response => {
            if (response.status >= 200 && response.status < 400) {
                return resolve()
            }
            return response.json().then(data => {
                return reject({[blurredField]: data.message})
            })
            //return {status: response.status, message: (response.status >= 400) ? response.json() : null}
        })
   }) 
}

const SignUpForm = props => {
    const { handleSubmit } = props;
    return (<form onSubmit={handleSubmit}>
            <Field name="username" component={renderField} type="text" label="Username"/>
            <Field name="password" component={renderField} type="password" label="Password (at least 8 characters)"/>
            <Field name="confirmPassword" component={renderField} type="password" label="Confirm password"/>
            <Field name="email" component={renderField} type="text" label="Email"/>
            <Field name="firstName" component={renderField} type="text" label="First Name"/>
            <Field name="lastName" component={renderField} type="text" label="Last Name"/>
        <button type="submit">Submit</button>
    </form>)
}

export default reduxForm({
    form: 'form',
    validate,
    asyncValidate,
    asyncBlurFields,
    onSubmit: submit,
    getFormState: ({content}) => content.signup.form
})(SignUpForm)

