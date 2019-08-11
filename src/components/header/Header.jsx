import React from "react";
import { Link } from "react-router-dom"
import { connect } from 'react-redux'
import LogoutButton from "./LogoutButton"

const mapStateToProps = state => {
	return {
		loggedIn: state.login.loggedIn,
	}
}

const Public = [
	{
		to: "/",
		label: "Home"
	},
	{
		to: "/q",
		label: "kjuuz"
	}
]
const Private = [
	{
		to: "/topsecret",
		label: "neklikat"
	},
	{
		to: "/profile",
		label: "profil mucQ"
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

const Header = connect(mapStateToProps)(({loggedIn}) => {
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
			<LogoutButton/>
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
