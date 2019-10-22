import React from 'react'
import { Redirect } from "react-router-dom";

import LogoutButton from './LogoutButton'

export default (props) => {
	console.log(props)
	return !props.loggedIn ? (
		<Redirect to={props.redirect} />
	) : (
		<div>
			To access resource {props.redirect}, please
			<LogoutButton loggedIn={props.loggedIn} logout={props.logout}/>
		</div>
	)
}