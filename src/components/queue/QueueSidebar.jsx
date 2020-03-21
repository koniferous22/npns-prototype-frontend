import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
import { globalActions } from '../../actions/global'

import SidebarDiv from '../../styled-components/sidebars/Sidebar'
import HierarchicalListDiv from '../../styled-components/sidebars/HierarchicalListDiv'
import CollapsedSidebarDiv from '../../styled-components/sidebars/CollapsedSidebar'

import QueueDropdown from './QueueDropdown'

/*co ma byt ta baseUrl? nikde sa to nepassuje, je to vecne undefined*/
const QueueSidebar = ({ baseUrl }) => {
	const hierarchy = useSelector(state => state.global.hierarchy)
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(globalActions.queues())
		dispatch(globalActions.hierarchy())
	}, [dispatch]);

	const hierarchicalEntries = <QueueSidebarEntries baseUrl={baseUrl || '/q'} queues={hierarchy} />
	const dropdownEntries = <QueueDropdown baseUrl={baseUrl || '/q'}/>
	if (false) {
		return (
			<div>
				<HierarchicalListDiv>
					{hierarchicalEntries}
				</HierarchicalListDiv>
				<CollapsedSidebarDiv>
					{dropdownEntries}
				</CollapsedSidebarDiv>
			</div>
		)
	}
	return (
		<div>
			<CollapsedSidebarDiv>
				{dropdownEntries}
			</CollapsedSidebarDiv>
			<SidebarDiv>
				<HierarchicalListDiv>
					{hierarchicalEntries}
				</HierarchicalListDiv>
			</SidebarDiv>
		</div>
	)
}

export default QueueSidebar
