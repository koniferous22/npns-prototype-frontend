import React from 'react'
import { Redirect } from "react-router-dom"

import LogoutButton from './LogoutButton'

export default ({ loggedIn, redirect, logout }) => {
	return !loggedIn ? (
		<Redirect to={redirect} />
	) : (
		<div>
			To access resource {redirect}, please
			<LogoutButton loggedIn={loggedIn} logout={logout}/>
		</div>
	)
}
