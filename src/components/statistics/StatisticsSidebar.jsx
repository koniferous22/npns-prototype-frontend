import React from "react";
import { Link } from "react-router-dom"

import SidebarDiv from '../../styled-components/sidebars/Sidebar'

import QueueSidebar from '../queue/QueueSidebar'
import CollapsedSidebarDiv from '../../styled-components/sidebars/CollapsedSidebar'

const StatisticsSidebar = (props) => {
	const routes = [
		{
			to: "/economy",
			label: "System Economy"
		},
		{
			to: "/scoreboard/Index",
			label: "User Scoreboard"
		}
	]
	const baseUrl = "/statistics"
	return (
		<div>
			<CollapsedSidebarDiv>
				This is collapsed sidebar
			</CollapsedSidebarDiv>
			<SidebarDiv loggedIn={props.loggedIn}>
				<ul>
				{
					routes.map((entry, index) => (
						<li key={index}><Link to={baseUrl + entry.to}>{entry.label}</Link></li>
					))
				}
				</ul>
				{props.addQueues && props.queueBaseUrl && <QueueSidebar reuse baseUrl={props.queueBaseUrl}/>}
			</SidebarDiv>
		</div>
	)

}

export default StatisticsSidebar