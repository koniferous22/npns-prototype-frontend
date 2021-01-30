import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import queryString from 'query-string'

import SignUpForm from './SignUpForm'
import { signUpStages } from '../../store/content/signUpPage'
import { reset } from '../../store/content/signUpPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

import { gql, useMutation } from '@apollo/client'


const SignUpPage = ({ location }) => {
	const dispatch = useDispatch()
	useEffect(() => {
		return () => {
			dispatch(reset())
		};
  }, [dispatch]);

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
	const { stage, message, messageType } = useSelector(state => state.content.signUp.page)

  if (loading) return <ContentDiv>Loading...</ContentDiv>;
  if (error) return <ContentDiv>{error.message}</ContentDiv>;

	switch(stage) {
		case signUpStages.COMPLETED:
			return (
				<ContentDiv>
					<BackendMessage messageType={messageType}>
						{JSON.stringify(message.message)}
					</BackendMessage>
					<ol>
						{message.steps.map((step, i) => (
							<li key={i}>{step}</li>
						))}
					</ol>
				</ContentDiv>
			)
		case signUpStages.SUBMITTING_FORM:
		default:
			const referred_by = queryString.parse(location.search).referred_by
			return (
				<ContentDiv>
					<BackendMessage messageType={messageType}>
						{JSON.stringify(message)}
					</BackendMessage>
					<h1>REGISTRUJ SA PRIATELU</h1>
					<SignUpForm onSubmit={onSubmit} initialValues={{referred_by: referred_by}} />
				</ContentDiv>
			)
	}
}

export default withRouter(SignUpPage)