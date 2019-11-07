import React from "react";
import { Link } from "react-router-dom"

import SidebarDiv from '../../styled-components/defaults/Sidebar'

import QueueSidebar from '../queue/QueueSidebar'

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
		<SidebarDiv>
			<ul>
			{
				routes.map((entry, index) => (
					<li key={index}><Link to={baseUrl + entry.to}>{entry.label}</Link></li>
				))
			}
			</ul>
			{props.addQueues && props.queueBaseUrl && <QueueSidebar reuse baseUrl={props.queueBaseUrl}/>}
		</SidebarDiv>
	)

}

export default StatisticsSidebar