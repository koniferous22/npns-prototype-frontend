import React, { useContext, useEffect } from 'react'
import LoginForm from './LoginForm'
import { Link } from "react-router-dom"
import { gql, useMutation } from '@apollo/client'
import AuthContext from '../../AuthContext'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const LoginPage = () => {
  const { loggedIn, logIn, setToken, token } = useContext(AuthContext);

  useEffect(() => {
    console.log('toto je z LoginPage')
    console.log(loggedIn)
    console.log(token)
  });


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
  .then(res => {
    console.log(res);
    setToken(res.data.userSignIn.token);
    logIn();
    }
  )
  .catch(error => {
    console.log(error);
    }
  );

  const [ signIn, { loading, error, data } ] = useMutation(SIGN_IN, { errorPolicy: 'all'});
  console.log(loading, error, data);

  if (loading) return <ContentDiv>Loading...</ContentDiv>;

  return(
    <ContentDiv>
      <CenteredDiv>
        <BackendMessage messageType='ERROR'>
          {error && error.message}
        </BackendMessage>
      </CenteredDiv>
      <LoginForm onSubmit={onSubmit} />
      { loggedIn && <div>logged in currently</div>}
      <ContentDiv></ContentDiv>
      <CenteredDiv>
        <Link to="/forgotpwd" >Forgot Password?</Link>
      </CenteredDiv>
    </ContentDiv>
  )
}

export default LoginPage