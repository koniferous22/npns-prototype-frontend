import React from 'react';
import { Link } from "react-router-dom"
import { connect } from 'react-redux'

import { globalActions } from '../../actions/global'

const mapStateToProps = state => ({
	displayed: state.global.linQueuesDisplayed
})

const mapDispatchToProps = dispatch => {
	return {
		show: () => dispatch(globalActions.showLinQueues()),
		hide: () => dispatch(globalActions.hideLinQueues())
	}
}

class QueueDrowdown extends React.Component {

	componentWillUnmount() {
		if (this.props.displayed) {
			this.props.hide()
		}
	}
	render() {
		return (
			<div  className="dropdown" >
				<div className="button" onClick={this.props.displayed ? this.props.hide : this.props.show}> Pick a Queue </div>
				{ this.props.displayed && (
					<ul>
						{this.props.linQueues.map((q, index) => <li key={index} value={q}><Link to={this.props.baseUrl + '/' + q}>{q}</Link></li>)}
					</ul>
				)}
			</div>
		)
	}
}

export default  connect(mapStateToProps, mapDispatchToProps)(QueueDrowdown)