import React from "react";
import { Link } from "react-router-dom"

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
	return (<ul>
		{
			routes.map((entry, index) => (
				<li key={index}><Link to={baseUrl + entry.to}>{entry.label}</Link></li>
			))
		}
	</ul>)

}

export default StatisticsSidebar