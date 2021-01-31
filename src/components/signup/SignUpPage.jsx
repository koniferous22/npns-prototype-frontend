import React from 'react';
import { withRouter } from 'react-router'
import queryString from 'query-string'

import SignUpForm from './SignUpForm'
import ContentDiv from '../../styled-components/defaults/ContentDiv'

import { gql, useMutation } from '@apollo/client'


const SignUpPage = ({ location }) => {
  const SIGN_UP = gql`
    mutation SignUp($username: String!, $email: String!, $password: String!) {
      userRequestSignUp(username: $username, email: $email, password: $password) {
        message
      }
    }
  `;

  const onSubmit = ({ username, password, email }) => signUp({
    variables: {
      username,
      password,
      email
    }
  })

	const [ signUp, { loading, error, data } ] = useMutation(SIGN_UP, { errorPolicy: 'all'});

  if (loading) return <ContentDiv>Loading...</ContentDiv>;
  if (error) return <ContentDiv>{error.message}</ContentDiv>;
  if (data) return <ContentDiv>You've signed up successfully. Please confirm your e-mail adress before signing in.</ContentDiv>
  
  const referred_by = queryString.parse(location.search).referred_by
	return (
		<ContentDiv>
			<h1>REGISTRUJ SA PRIATELU</h1>
			<SignUpForm onSubmit={onSubmit} initialValues={{referred_by: referred_by}} />
		</ContentDiv>
  );
}

export default withRouter(SignUpPage)