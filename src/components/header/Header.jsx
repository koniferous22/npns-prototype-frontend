import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import LogoutButton from "./LogoutButton"

const mapStateToProps = state => {
	return {
		loggedIn: !!state.auth.user,
	}
}

const Public = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/q/Index",
		label: "Problems"
	}
]
const Private = [
	{
		to: "/",
		label: "My Submissions"
	},
	{
		to: "/profile",
		label: "My Profile"
	},

	{
		to: "/topsecret",
		label: "Statistics"
	}
]

const Unregistered = [
	{
		to: "/login",
		label: "Logen"
	},
	{
		to: "/register",
		label: "Regooster"
	}
]

const Header = connect(mapStateToProps)(({loggedIn, logout}) => {
	return loggedIn ? (
		<div>
			<ul>
				{Public.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
				{Private.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
			</ul>
			<LogoutButton loggedIn={true} logout={logout}/>
		</div>
	) : (
		<div>
			<ul>
				{Public.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
				{Unregistered.map((o,index) => (
					<li key={index}>
						<Link to={o.to}>{o.label}</Link>	
					</li>
				))}
			</ul>
		</div>
	);
})

export default Header
