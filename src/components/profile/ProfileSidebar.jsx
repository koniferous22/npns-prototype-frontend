import React from "react";
import { Link } from "react-router-dom"

import SidebarDiv from '../../styled-components/sidebars/Sidebar'
import CollapsedSidebar from '../../styled-components/sidebars/CollapsedSidebar'

const ProfileSidebar = ({ auth_view, baseUrl }) => {
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
			label: (auth_view) ? "My profile page" : "Profile page"
		},
		{
			to: "/activity",
			label: "User Activity"
		}
	]

	const routes = (auth_view) ? publicRoutes.concat(privateRoutes) : publicRoutes
	const routeElements = (
		<ul>
			{
				routes.map((entry, index) => (
					<li key={index}><Link to={baseUrl + entry.to}>{entry.label}</Link></li>
				))
			}
		</ul>
	)
	return (
		// render both versions, only one is displayed, depends on screen size
		<div>
			<CollapsedSidebar>
				{routeElements}		
			</CollapsedSidebar>
			<SidebarDiv>
				{routeElements}
			</SidebarDiv>
		</div>
	)
}

export default ProfileSidebar
