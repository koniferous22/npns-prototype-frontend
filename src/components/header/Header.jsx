import React from "react";
import { Link } from "react-router-dom"

import ThemeDropdown from './ThemeDropdown'

import LogoutButton from "../auth/LogoutButton"

import HeaderEntry from '../../styled-components/header/HeaderEntry'
import HeaderEntries from '../../styled-components/header/HeaderEntries'
import StyledHeader from '../../styled-components/header/Header'

import HeaderDiv from '../../styled-components/header/HeaderDiv'

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
		<StyledHeader loggedIn={loggedIn}>
			<HeaderDiv collapse>{loggedIn ? 'Logged in as ' + username : 'You are not logged in'}
			</HeaderDiv>
			<HeaderDiv grow>
				<HeaderEntries>
					{stuff}
				</HeaderEntries>
			</HeaderDiv>
			<HeaderDiv shrink>
				<ThemeDropdown />
			</HeaderDiv>
			<HeaderDiv shrink>
				{loggedIn && <LogoutButton header logout={logout}/>}
			</HeaderDiv>
		</StyledHeader>
	)
}

export default Header
