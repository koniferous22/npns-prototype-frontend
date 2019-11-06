import React from "react";
import { Link } from "react-router-dom"

import LogoutButton from "../auth/LogoutButton"

import HeaderEntry from '../../styled-components/header/StyledHeaderEntry'
import HeaderEntries from '../../styled-components/header/StyledHeaderEntries'
import StyledHeader from '../../styled-components/header/StyledHeader'

import HeaderDiv from '../../styled-components/header/StyledHeaderDiv'

const Header = ({loggedIn, logout, username}) => {
	const publicStuff = [
		{
			to: "/",
			label: "Home"
		},
		{
			to: "/q/Index",
			label: "Problems"
		}
	]

	const privateStuff = [
		{
			to: "/u/" + username + "/activity",
			label: "My Submissions"
		},
		{
			to: "/u/" + username,
			label: "My Profile"
		},
		{
			to: "/statistics/economy",
			label: "Statistics"
		}
	]
	const unregisteredStuff = [
		{
			to: "/login",
			label: "Logen"
		},
		{
			to: "/signup",
			label: "Regooster"
		}
	]
	let stuff = loggedIn ? publicStuff.concat(privateStuff) : publicStuff.concat(unregisteredStuff)
	stuff = stuff.map((o, index) => (
		<HeaderEntry key={index}>
			<Link to={o.to}>{o.label}</Link>
		</HeaderEntry>
	))
	console.log('LOGGED IN')
	console.log(loggedIn)
	return (
		<StyledHeader loggedIn={loggedIn}>
			<HeaderDiv>{loggedIn ? 'Logged in as ' + username : 'You are not logged in'}
			</HeaderDiv>
				<HeaderEntries>
					{stuff}
				</HeaderEntries>
			{loggedIn && <LogoutButton header loggedIn={true} logout={logout}/>}
		</StyledHeader>
	)
}

export default Header
