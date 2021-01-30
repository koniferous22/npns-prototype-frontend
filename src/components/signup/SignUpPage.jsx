import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import queryString from 'query-string'

import SignUpForm from './SignUpForm'
import { signUpStages } from '../../store/content/signUpPage'
import { reset} from '../../store/content/signUpPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const SignUpPage = ({ location }) => {
	const { stage, message, messageType } = useSelector(state => state.content.signUp.page)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(reset())
		};
	}, [dispatch]);

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
					<SignUpForm initialValues={{referred_by: referred_by}} />
				</ContentDiv>
			)
	}
}

export default withRouter(SignUpPage)
