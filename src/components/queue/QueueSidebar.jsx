import React from 'react';
import { connect } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
import { globalActions } from '../../actions/global'

import SidebarDiv from '../../styled-components/defaults/Sidebar'
import CollapsedSidebarDiv from '../../styled-components/defaults/CollapsedSidebar'

import QueueDropdown from './QueueDropdown'

const mapStateToProps = state => ({
	hierarchy: state.global.hierarchy,
	linQueues: state.global.linQueues
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
		const dropdownEntries = <QueueDropdown linQueues={this.props.linQueues} baseUrl={this.props.baseUrl || '/q'}/>
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
				<SidebarDiv>
					{hierarchicalEntries}
				</SidebarDiv>
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(QueueSidebar)