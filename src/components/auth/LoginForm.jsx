import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { login } from '../../store/auth'
import LoginButton from '../../styled-components/form/FormButton'

import Input from '../form/Input'


const LoginForm = () => {
	const dispatch = useDispatch()
	const { register, handleSubmit, errors } = useForm()
	const onSubmit = data => dispatch(login(data.username, data.password))

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Input name="username" label="Username" type="text" ref={register} errors={errors} required alignLeft />
			<Input name="password" label="Password" type="password" ref={register} errors={errors} required alignLeft />
			<LoginButton type="submit" alignLeft>Submit</LoginButton>
		</form>
	)
}

export default LoginForm 
