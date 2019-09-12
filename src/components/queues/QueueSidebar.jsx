import React from 'react';
import { connect } from 'react-redux'

import QueueSidebarEntries from './QueueSidebarEntries'
//import { appConfig } from '../../appConfig'
import { globalActions } from '../../actions/global'
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
		return (
			<QueueSidebarEntries queues={this.props.hierarchy}/>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(QueueSidebar)