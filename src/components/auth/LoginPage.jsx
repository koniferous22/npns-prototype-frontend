import React from 'react'
import LoginForm from './LoginForm'
import { Link } from "react-router-dom"
import { gql, useMutation } from '@apollo/client'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const LoginPage = () => {
  const SIGN_IN = gql`
    mutation UserSignIn($identifier: String!, $password: String!) {
      userSignIn(identifier: $identifier, password: $password) {
        user {
          username
          email
          _id
        }
      token
      }
    }
  `;
 
  const onSubmit = ({ identifier, password }) => signIn({
    variables: {
      identifier,
      password
    }
  })

  const [ signIn, { loading, error, data } ] = useMutation(SIGN_IN, { errorPolicy: 'all'});
  console.log(loading, error, data)
  
  if (loading) return <ContentDiv>Loading...</ContentDiv>;

  return(
    <ContentDiv>
      <CenteredDiv>
        <BackendMessage messageType='ERROR'>
          {error && error.message}
        </BackendMessage>
      </CenteredDiv>
      <LoginForm onSubmit={onSubmit} />
      <ContentDiv></ContentDiv>
      <CenteredDiv>
        <Link to="/forgotpwd" >Forgot Password?</Link>
      </CenteredDiv>
    </ContentDiv>
  )
}

export default LoginPage
