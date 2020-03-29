import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ForgotPasswordForm from './ForgotPasswordForm'
import { forgotPwdStages } from '../../store/content/forgotPwdPage'
import { reset } from '../../store/content/forgotPwdPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const ForgotPassword = ({ loggedIn }) => {
	const { stage, message, messageType } = useSelector(state => state.content.forgotPwd.page)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(reset())
		};
	}, [dispatch]);

	switch (stage) {
		case forgotPwdStages.EMAIL_SENT:
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
		case forgotPwdStages.SUBMITTING_FORM:
		default:
			return (
				<ContentDiv>
					<BackendMessage messageType={messageType}>
						{message}
					</BackendMessage>
					<ForgotPasswordForm />
				</ContentDiv>
			)
	}
}

export default ForgotPassword
