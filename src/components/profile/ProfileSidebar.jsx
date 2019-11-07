import React from "react";
import { Link } from "react-router-dom"

import SidebarDiv from '../../styled-components/defaults/Sidebar'

const ProfileSidebar = (props) => {
	const privateRoutes = [
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
	const publicRoutes = [
		{
			to: "/",
			label: (props.auth_view) ? "My profile page" : "Profile page"
		},
		{
			to: "/activity",
			label: "User Activity"
		}
	]

	const routes = (props.auth_view) ? publicRoutes.concat(privateRoutes) : publicRoutes
	return (
		<SidebarDiv>
			<ul>
			{
				routes.map((entry, index) => (
					<li key={index}><Link to={props.baseUrl + entry.to}>{entry.label}</Link></li>
				))
			}
			</ul>
		</SidebarDiv>
	)

}

export default ProfileSidebar