import React from 'react';
import { connect } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
import { globalActions } from '../../actions/global'

import SidebarDiv from '../../styled-components/defaults/Sidebar'
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
		const entries = <QueueSidebarEntries baseUrl={this.props.baseUrl || '/q'} queues={this.props.hierarchy} />
		if (this.props.reuse) {
			return entries
		}
		return (
			<SidebarDiv>
				{entries}
			</SidebarDiv>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(QueueSidebar)