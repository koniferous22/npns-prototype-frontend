import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import queryString from 'query-string'

import SignUpForm from './SignUpForm'
import { signupStages } from '../../constants/content/signUpPage'
import { reset} from '../../store/content/signUpPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const SignUpPage = ({ location }) => {
	const { stage, message, messageType } = useSelector(state => state.content.signup.page)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(reset())
		};
	}, [dispatch]);

	switch(stage) {
		case signupStages.COMPLETED:
			return (
				<ContentDiv>
					<BackendMessage messageType={messageType}>
						{message.message}
					</BackendMessage>
					<ol>
						{message.steps.map((step, i) => (
							<li key={i}>{step}</li>
						))}
					</ol>
				</ContentDiv>
			)
		case signupStages.SUBMITTING_FORM:
		default:
			const referred_by = queryString.parse(location.search).referred_by
			return (
				<ContentDiv>
					<BackendMessage messageType={messageType}>
						{message}
					</BackendMessage>
					<h1>REGISTRUJ SA PRIATELU</h1>
					<SignUpForm initialValues={{referred_by: referred_by}} />
				</ContentDiv>
			)
	}
}

export default withRouter(SignUpPage)
