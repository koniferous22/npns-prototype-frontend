import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirm } from '../../store/content/confirm/registration'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const ConfirmRegistrationPage = ({ token }) => {
	const { verified, message, messageType } = useSelector(state => state.content.confirm.registration)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(confirm(token))
	}, [dispatch, token]);

	return (
		<ContentDiv>
			<BackendMessage messageType={messageType}>
				{message}
			</BackendMessage>
			{verified && (<p> Continue to <Link to='/login'>Login</Link> </p>)}
		</ContentDiv>
	)
}

export default ConfirmRegistrationPage
