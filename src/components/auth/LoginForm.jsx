import React from 'react'
import { useForm } from 'react-hook-form'

import LoginButton from '../../styled-components/form/FormButton'

import Input from '../form/Input'


const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit, errors } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input name="identifier" label="Username or Email" type="text" ref={register({ required: true })} errors={errors} alignLeft />
      <Input name="password" label="Password" type="password" ref={register({ required: true })} errors={errors} alignLeft />
      <LoginButton type="submit" alignLeft>Submit</LoginButton>
    </form>
  )
}

export default LoginForm 
