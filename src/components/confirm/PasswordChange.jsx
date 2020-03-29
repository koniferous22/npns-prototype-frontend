import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
	confirmPasswordChangeStages,
	verify,
	reset
} from '../../store/content/confirm/passwordChange'

import PasswordChangeForm from './PasswordChange/PasswordChangeForm'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const ConfirmPasswordChangePage = ({ token }) => {
	const { stage, message, messageType } = useSelector(state => state.content.confirm.passwordChange.page)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verify(token))
		return () => {
			dispatch(reset())
		};
	}, [dispatch, token]);

	switch (stage) {
		case confirmPasswordChangeStages.COMPLETED:
			return (
				<ContentDiv>
					{'Password successfully changed, click '}
					<Link to="/login">here</Link>
					{' to log in'}
				</ContentDiv>
			)
		case confirmPasswordChangeStages.SUBMITTING_FORM:
			return (
				<ContentDiv>
						<BackendMessage messageType={messageType}>
							{message}
						</BackendMessage>
					<PasswordChangeForm token={token} />
				</ContentDiv>
			)
		case confirmPasswordChangeStages.INVALID_TOKEN:
		default:
			return (
				<ContentDiv>
					<BackendMessage messageType={messageType}>
						{message}
					</BackendMessage>
				</ContentDiv>
			)
	}
} 

export default ConfirmPasswordChangePage
