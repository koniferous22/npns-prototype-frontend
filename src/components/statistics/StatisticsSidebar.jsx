import React from "react";
import { Link } from "react-router-dom"

import SidebarDiv from '../../styled-components/sidebars/Sidebar'

import QueueSidebar from '../queue/QueueSidebar'
import QueueDropdown from '../queue/QueueDropdown'
import CollapsedSidebar from '../../styled-components/sidebars/CollapsedSidebar'
import CollapsedSidebarDiv from '../../styled-components/sidebars/CollapsedSidebarDiv'

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
		<div>
			<CollapsedSidebar>
				<CollapsedSidebarDiv grow>
					{routeElements}
				</CollapsedSidebarDiv>
				<CollapsedSidebarDiv shrink>
					{props.addQueues && props.queueBaseUrl && <QueueDropdown baseUrl={props.queueBaseUrl} />}
				</CollapsedSidebarDiv>
			</CollapsedSidebar>
			<SidebarDiv loggedIn={props.loggedIn}>
				{routeElements}			
				{props.addQueues && props.queueBaseUrl && <QueueSidebar reuse baseUrl={props.queueBaseUrl}/>}
			</SidebarDiv>
		</div>
	)

}

export default StatisticsSidebar