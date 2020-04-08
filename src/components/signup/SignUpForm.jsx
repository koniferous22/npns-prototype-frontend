import React from 'react' 
import { useDispatch, useSelector } from 'react-redux' 
import { useForm } from 'react-hook-form' 
 
import { signup, validate, validateField } from '../../store/content/signUpPage'
import FormButton from '../../styled-components/form/FormButton'
 
import Input from '../form/Input' 


const SignUpForm = () => {
  const dispatch = useDispatch()
	console.log('DO PICE KURVA')
  const zid = useSelector(state => state.content.signUp)
	console.log('picusek')
	console.log(zid)

  const { register, getValues, handleSubmit, errors } = useForm()
  const onSubmit = data => dispatch(signup(data))
  const onBlur = (values, field) => validate(values, field)
  return ( 
    <form onSubmit={handleSubmit(onSubmit)}> 
      <Input name="username" label="Username" type="text" ref={register({ required: true })} errors={errors} alignLeft /> 
      <Input name="password" label="Password" type="password" ref={register({ required: true })} errors={errors} placeholder="at least 8 characters" alignLeft /> 
			<Input name="confirmPassword" type="password" ref={register({ required: true })} errors={errors} label="Confirm password" alignLeft/>
			<Input name="email" type="text" label="Email" ref={register({ required: true })} errors={errors} alignLeft/>
			<Input name="referred_by" type="text" label="Referred by" ref={register} errors={errors} onBlur={onBlur(getValues(), 'referred_by')} alignLeft/>
      <FormButton type="submit" alignLeft>Submit</FormButton> 
    </form> 
  ) 
} 
 
export default SignUpForm  

/*import React from 'react'
import { Field, reduxForm } from 'redux-form'

import renderField from '../form/RenderField'
import { signup, validateField } from '../../store/content/signUpPage'

import FormButton from '../../styled-components/form/FormButton'

const submit = (values, dispatch, props) => {
	dispatch(signup(values))
}

const validate = ({
	username,
	password,
	email,
	confirmPassword
}) => {
	const errors = {}
	if (!username) {
		errors.username = 'Required'
	}
	if (!password) {
		errors.password = 'Required'
	}
	if (!email) {
		errors.email = 'Required'
	}
	if (!confirmPassword) {
		errors.confirmPassword = 'Required'
	}
	if (confirmPassword !== password) {
		errors.confirmPassword = 'Passwords don\'t match'
	}
	return errors
}

const asyncBlurFields = ['username', 'password', 'email', 'referred_by']

const SignUpForm = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field name="username" component={renderField} type="text" label="Username" alignLeft/>
			<Field name="password" component={renderField} type="password" label="Password" placeholder="at least 8 characters" alignLeft/>
			<Field name="confirmPassword" component={renderField} type="password" label="Confirm password" alignLeft/>
			<Field name="email" component={renderField} type="text" label="Email" alignLeft/>
			<Field name="firstName" component={renderField} type="text" label="First Name" alignLeft/>
			<Field name="lastName" component={renderField} type="text" label="Last Name" alignLeft/>
			<Field name="referred_by" component={renderField} type="text" label="Referred by" alignLeft/>
			<FormButton type="submit" alignLeft>Submit</FormButton>
		</form>
	)
}

export default reduxForm({
	form: 'form',
	validate,
	asyncValidate: (values, dispatch, props, blurredField) => validateField(values, blurredField),
	asyncBlurFields,
	onSubmit: submit,
	getFormState: ({content}) => content.signUp.form
})(SignUpForm)*/
