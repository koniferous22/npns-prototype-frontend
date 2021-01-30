import React from 'react' 
import { useDispatch, useSelector } from 'react-redux' 
import { useForm } from 'react-hook-form' 
 
//import { signup, validate, validateField } from '../../store/content/signUpPage'
import FormButton from '../../styled-components/form/FormButton'
 
import Input from '../form/Input' 

import { gql, useMutation } from '@apollo/client'

const SignUpForm = ({ onSubmit }) => {
  const dispatch = useDispatch()
  const selector = useSelector(state => state.content.signUp)
  console.log(selector)

  const VALIDATE_USERNAME = gql`
    mutation ValidateUsername($username: String!) {
      validateUsername(username: $username) {
        result
        message
      }    
    }
  `;
  
  const VALIDATE_EMAIL = gql`
    mutation ValidateEmail($email: String!) {
      validateEmail(email: $email) {
        result
        message
      }
    }
  `;
  
  const [validateUsername, { loadingUsername, errorUsername, dataUsername }] = useMutation(VALIDATE_USERNAME, { errorPolicy: 'all'});
  const [validateEmail, { loadingEmail, errorEmail, dataEmail }] = useMutation(VALIDATE_EMAIL, { errorPolicy: 'all'});

  const { 
    register,
    getValues,
    handleSubmit,
    errors
  } = useForm({
    mode: 'onBlur',
    reValidateMode: 'onBlur'
  })
  
  return ( 
    <form onSubmit={handleSubmit(onSubmit)} > 
      <Input
        name="username"
        label="Username"
        type="text"
        ref={
          register({
            required: true,
            validate: async (username) => {
              try {
                const valResult = await validateUsername({
                  variables: {
                    username
                  }
                })
                return valResult.data.validateUsername.result;
              } catch(e) {
                return `Uncaught GQL error ${e.message}`
              }
            }
          })
        }
        errors={errors}
        alignLeft
      /> 
      <Input name="password" label="Password" type="password" ref={register({ required: true })} errors={errors} placeholder="at least 8 characters" alignLeft /> 
			<Input name="confirmPassword" type="password" ref={register({ required: true })} errors={errors} label="Confirm password" alignLeft/>
      <Input 
        name="email"
        type="text" 
        label="Email" 
        ref={
          register({
            required: true,
            validate: async (email) => {
              try {
                const valResult = await validateEmail({
                  variables: {
                    email
                  }
                })
                return valResult.data.validateEmail.result;
              } catch(e) {
                return `Uncaught GQL error ${e.message}`
              }
            }
          })
        } 
        errors={errors}
        alignLeft
      />
      <FormButton type="submit" alignLeft>Submit</FormButton> 
    </form> 
  ) 
} 
			//<Input name="referred_by" type="text" label="Referred by" ref={register} errors={errors} onBlur={() => onBlur(getValues(), 'referred_by')} alignLeft/>
 
export default SignUpForm