import React from 'react';
import { connect } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
import { globalActions } from '../../actions/global'

import SidebarDiv from '../../styled-components/defaults/Sidebar'
import CollapsedSidebarDiv from '../../styled-components/defaults/CollapsedSidebar'

const mapStateToProps = state => ({
	hierarchy: state.global.hierarchy
})

const mapDispatchToProps = dispatch => ({
	loadHierarchy: () => dispatch(globalActions.hierarchy())

})

class QueueSidebar extends React.Component {
	
	componentDidMount() {
		this.props.loadHierarchy()
	}
	render() {
		const hierarchicalEntries = <QueueSidebarEntries baseUrl={this.props.baseUrl || '/q'} queues={this.props.hierarchy} />

		if (this.props.reuse) {
			return hierarchicalEntries
		}
		return (
			<div>
				<CollapsedSidebarDiv>
					This is Collapsed Sidebar
				</CollapsedSidebarDiv>
				<SidebarDiv sidebarWidth="15em">
					{hierarchicalEntries}
				</SidebarDiv>
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(QueueSidebar)