import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
import { queues, hierarchy } from '../../store/global'

import SidebarDiv from '../../styled-components/sidebars/Sidebar'
import HierarchicalListDiv from '../../styled-components/sidebars/HierarchicalListDiv'
import CollapsedSidebarDiv from '../../styled-components/sidebars/CollapsedSidebar'

import QueueDropdown from './QueueDropdown'

const QueueSidebar = ({ baseUrl }) => {
	const hierarchyData = useSelector(state => state.global.hierarchy)
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(queues())
		dispatch(hierarchy())
	}, [dispatch]);

	const hierarchicalEntries = <QueueSidebarEntries baseUrl={baseUrl || '/q'} queues={hierarchyData} />
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
