import React from "react";
import { Link } from "react-router-dom"

const ProfileSidebar = (props) => {
	const Routes = [
		{
			to: "/",
			label: "My profile page"
		},
		{
			to: "/personal",
			label: "Personal Information"
		},
		{
			to: "/premium",
			label: "Premium"
		},
		{
			to: "/transactions",
			label: "Transactions"
		}
	]
	return (<ul>
		{
			Routes.map((entry, index) => (
				<li key={index}><Link to={props.baseUrl + entry.to}>{entry.label}</Link></li>
			))
		}
	</ul>)

}

export default ProfileSidebar