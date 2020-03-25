import React from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { hideLinQueues, showLinQueues } from '../../store/global'

import StyledQueueDropdown from '../../styled-components/sidebars/QueueDropdown'
import QueueDropdownEntries from '../../styled-components/sidebars/QueueDropdownEntries'

const QueueDropdown = ({ baseUrl }) => {
	const dispatch = useDispatch()
	const { 
		linQueues,
		linQueuesDisplayed: displayed
	} = useSelector(state => state.global)

	const show = () => dispatch(showLinQueues()) 
	const hide = () => dispatch(hideLinQueues())
	
	return (
		<div className="dropdown" >
			<StyledQueueDropdown onClick={displayed ? hide : show}> Pick a Queue </StyledQueueDropdown>
			{ displayed && (
				<QueueDropdownEntries>
					{linQueues.map((q, index) => <li key={index} value={q} onClick={hide}><Link to={baseUrl + '/' + q}>{q}</Link></li>)}
				</QueueDropdownEntries>
			)}
		</div>
	)
}

export default QueueDropdown
