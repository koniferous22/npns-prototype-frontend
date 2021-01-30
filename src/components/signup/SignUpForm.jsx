import React from 'react' 
import { useForm } from 'react-hook-form' 
import { gql, useMutation } from '@apollo/client'

import FormButton from '../../styled-components/form/FormButton'
import Input from '../form/Input' 


const SignUpForm = ({ onSubmit }) => {
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
  
  //const [validateUsername, { loadingUsername, errorUsername, dataUsername }] = useMutation(VALIDATE_USERNAME, { errorPolicy: 'all'});
  const [validateUsername] = useMutation(VALIDATE_USERNAME, { errorPolicy: 'all'});
  //const [validateEmail, { loadingEmail, errorEmail, dataEmail }] = useMutation(VALIDATE_EMAIL, { errorPolicy: 'all'});
  const [validateEmail] = useMutation(VALIDATE_EMAIL, { errorPolicy: 'all'});

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
                return valResult.data.validateUsername.result || 'Username invalid or taken';
              } catch(e) {
                return `Uncaught GQL error ${e.message}`
              }
            }
          })
        }
        errors={errors}
        alignLeft
      /> 
      <Input 
        name="password" 
        label="Password" 
        type="password" 
        ref={
          register({ 
            required: true 
          })
        } 
        errors={errors} 
        placeholder="at least 8 characters" 
        alignLeft 
      /> 
      <Input 
        name="confirmPassword" 
        type="password" 
        ref={
          register({ 
            required: true,      
            validate: () => 
              (getValues("confirmPassword") === getValues("password")) || 'Passwords not matching'
          })
        } 
        errors={errors}
        label="Confirm password"
        alignLeft
      />
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
                return valResult.data.validateEmail.result || 'Email invalid or taken';
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