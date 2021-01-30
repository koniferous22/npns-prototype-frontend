import React from 'react' 
import { useDispatch, useSelector } from 'react-redux' 
import { useForm } from 'react-hook-form' 
 
import { signup, validate, validateField } from '../../store/content/signUpPage'
import FormButton from '../../styled-components/form/FormButton'
 
import Input from '../form/Input' 


const SignUpForm = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.content.signUp)
  console.log(selector)

  const { register, getValues, handleSubmit, errors } = useForm()
  // TODO event handler goeshere xD
  //const onSubmit = data => dispatch(signup(data))
  console.log()

  const onBlur = (values, field) => dispatch(validate(values, field))
  return ( 
    <form onSubmit={handleSubmit(onSubmit)}> 
      <Input name="username" label="Username" type="text" ref={register({ required: true })} errors={errors} alignLeft /> 
      <Input name="password" label="Password" type="password" ref={register({ required: true })} errors={errors} placeholder="at least 8 characters" alignLeft /> 
			<Input name="confirmPassword" type="password" ref={register({ required: true })} errors={errors} label="Confirm password" alignLeft/>
			<Input name="email" type="text" label="Email" ref={register({ required: true })} errors={errors} alignLeft/>
			<Input name="referred_by" type="text" label="Referred by" ref={register} errors={errors} onBlur={() => onBlur(getValues(), 'referred_by')} alignLeft/>
      <FormButton type="submit" alignLeft>Submit</FormButton> 
    </form> 
  ) 
} 
 
export default SignUpForm