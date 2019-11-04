import React from "react";
import { Link } from "react-router-dom"

import LogoutButton from "../auth/LogoutButton"

import HeaderEntry from '../../styled-components/header/StyledHeaderEntry'
import HeaderEntries from '../../styled-components/header/StyledHeaderEntries'
import InlineDiv from '../../styled-components/defaults/StyledInlineDiv'

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
	return (
		<InlineDiv>
			<InlineDiv>{loggedIn ? 'Logged in as ' + username : 'You are not logged in'}
			</InlineDiv>
			<HeaderEntries>
				{stuff}
			</HeaderEntries>
			{loggedIn && <LogoutButton loggedIn={true} logout={logout}/>}
		</InlineDiv>
	)
}

export default Header
