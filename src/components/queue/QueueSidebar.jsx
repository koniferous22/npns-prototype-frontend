import React from 'react';
import { connect } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
import { globalActions } from '../../actions/global'

import SidebarDiv from '../../styled-components/sidebars/Sidebar'
import CollapsedSidebarDiv from '../../styled-components/sidebars/CollapsedSidebar'

import QueueDropdown from './QueueDropdown'

const mapStateToProps = state => ({
	hierarchy: state.global.hierarchy,
})

const mapDispatchToProps = dispatch => ({
	loadHierarchy: () => dispatch(globalActions.hierarchy()),
	loadLinQueues: () => dispatch(globalActions.queues())
})

class QueueSidebar extends React.Component {
	
	componentDidMount() {
		this.props.loadLinQueues()
		this.props.loadHierarchy()
	}
	render() {
		const hierarchicalEntries = <QueueSidebarEntries baseUrl={this.props.baseUrl || '/q'} queues={this.props.hierarchy} />
		const dropdownEntries = <QueueDropdown baseUrl={this.props.baseUrl || '/q'}/>
		if (this.props.reuse) {
			return (
				<div>
					{hierarchicalEntries}
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
				<SidebarDiv shiftLists>
					{hierarchicalEntries}
				</SidebarDiv>
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(QueueSidebar)