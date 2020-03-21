import React, { useEffect } from 'react';
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

import { globalActions } from '../../actions/global'

import StyledQueueDropdown from '../../styled-components/sidebars/QueueDropdown'
import QueueDropdownEntries from '../../styled-components/sidebars/QueueDropdownEntries'

const QueueDropdown = ({ baseUrl }) => {

	const displayed = useSelector(state => state.global.linQueuesDisplayed)
	const { linQueues } = useSelector(state => state.global)
	const dispatch = useDispatch()
	const show = dispatch(globalActions.showLinQueues) 
	const hide = dispatch(globalActions.hideLinQueues)

	useEffect(() => {
		return () => {
			if (displayed) {
				hide()
			}
		};
	}, [hide, displayed]);

	return (
		<div	className="dropdown" >
			<StyledQueueDropdown onClick={() => displayed ? hide() : show()}> Pick a Queue </StyledQueueDropdown>
			{ displayed && (
				<QueueDropdownEntries>
					{linQueues.map((q, index) => <li key={index} value={q} onClick={() => hide()}><Link to={baseUrl + '/' + q}>{q}</Link></li>)}
				</QueueDropdownEntries>
			)}
		</div>
	)
}

export default QueueDropdown
