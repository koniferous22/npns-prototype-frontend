import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from "react-router-dom"

import { verify } from '../../store/auth'
import history from '../../history'


const Auth = ({ component: Component, loggedIn, ...rest }) => {
	const { token } = useSelector(state => state.auth)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(verify(token))
	}, [dispatch, token]);

	return loggedIn ? (
		<Component {...rest} />
	) : (
		<Redirect
			to={{
				pathname: "/login",
				state: { from: history.location.pathname }
			}}
		/>
	)
}

export default Auth
