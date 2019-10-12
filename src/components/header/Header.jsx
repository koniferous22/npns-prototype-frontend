import React from "react";
import { Link } from "react-router-dom"
import LogoutButton from "./LogoutButton"

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
			to: "/",
			label: "My Submissions"
		},
		{
			to: "/u/" + username,
			label: "My Profile"
		},

		{
			to: "/topsecret",
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

	return loggedIn ? (
		<div>
			<p>{'Logged in as ' + username}</p>
			<ul>
				{publicStuff.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
				{privateStuff.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
			</ul>
			<LogoutButton loggedIn={true} logout={logout}/>
		</div>
	) : (
		<div>
			<p>You are not logged in</p>
			<ul>
				{publicStuff.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
				{unregisteredStuff.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
			</ul>
		</div>
	);
}

export default Header
