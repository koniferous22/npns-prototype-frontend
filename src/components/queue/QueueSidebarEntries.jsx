import React from 'react';
import { Link } from "react-router-dom"

const QueueSidebarEntries = ({ queues, baseUrl }) => {
	const keys = Object.keys(queues);
	return (
		<ul>
			{keys.map(k => (
				<li key={k}>
					<Link to={baseUrl + '/' + k}>{k}</Link>
					<QueueSidebarEntries queues={queues[k]} baseUrl={baseUrl}/>
				</li>
			))}
		</ul>
	);
}

export default QueueSidebarEntries