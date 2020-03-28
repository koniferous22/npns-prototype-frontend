import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmUsernameChangeActions } from '../../actions/content/confirm/usernameChange'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const ConfirmUsernameChangePage = ({ token }) => {
	const { message, messageType, verified } = useSelector(state => state.content.confirm.usernameChange)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(confirmUsernameChangeActions.confirm(token))
	}, [dispatch, token]);

	return (
		<ContentDiv>
			<BackendMessage messageType={messageType}>
				{message && <p>{message}</p>}
			</BackendMessage>
			{verified && (<p> Continue to <Link to='/login'>Login</Link> </p>)}
		</ContentDiv>
	)
}

export default ConfirmUsernameChangePage
