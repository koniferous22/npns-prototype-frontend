import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { globalActions } from '../../actions/global'

import StyledQueueDropdown from '../../styled-components/sidebars/QueueDropdown'
import QueueDropdownEntries from '../../styled-components/sidebars/QueueDropdownEntries'

const mapStateToProps = state => ({
	displayed: state.global.linQueuesDisplayed,
	linQueues: state.global.linQueues
})

const mapDispatchToProps = dispatch => {
	return {
		show: () => dispatch(globalActions.showLinQueues()),
		hide: () => dispatch(globalActions.hideLinQueues())
	}
}

class QueueDropdown extends React.Component {

	componentWillUnmount() {
		if (this.props.displayed) {
			this.props.hide()
		}
	}
	render() {
		return (
			<div  className="dropdown" >
				<StyledQueueDropdown onClick={this.props.displayed ? this.props.hide : this.props.show}> Pick a Queue </StyledQueueDropdown>
				{ this.props.displayed && (
					<QueueDropdownEntries>
						{this.props.linQueues.map((q, index) => <li key={index} value={q} onClick={() => this.props.hide()}><Link to={this.props.baseUrl + '/' + q}>{q}</Link></li>)}
					</QueueDropdownEntries>
				)}
			</div>
		)
	}
}

export default  connect(mapStateToProps, mapDispatchToProps)(QueueDropdown)