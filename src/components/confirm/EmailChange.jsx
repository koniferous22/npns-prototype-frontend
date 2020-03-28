import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmEmailChangeActions } from '../../actions/content/confirm/emailChange'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const ConfirmEmailChangePage = ({ token }) => {
	const { verified, message, messageType } = useSelector(state => state.content.confirm.emailChange)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(confirmEmailChangeActions.confirm(token))
	}, [dispatch, token]);

	return (
		<ContentDiv>
			<BackendMessage messageType={messageType}>
				{message}
			</BackendMessage>
			{verified && (<div> Continue to <Link to='/login'>Login</Link> </div>)}
		</ContentDiv>
	)
}

export default ConfirmEmailChangePage
