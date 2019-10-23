import React from 'react';
import { Link } from "react-router-dom"

const QueueSidebarEntries = ({queues, setActiveQueue}) => {
	const keys = Object.keys(queues);
	return (
		<ul>
			{keys.map(k => (
				<li key={k}>
					<Link to={'/q/' + k}>{k}</Link>
					<QueueSidebarEntries queues={queues[k]}/>
				</li>
			))}
		</ul>
	);
}

export default QueueSidebarEntries