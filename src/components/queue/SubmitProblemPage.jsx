import React from 'react';
import { connect } from 'react-redux';

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'

import { submitProblemStages } from '../../constants/content/submitProblemPage' 

const mapStateToProps = (state, ownProps) => ({
	queue: ownProps.queue,
	token: ownProps.token,
	stage: state.content.submitProblem.page.stage,
	message: state.content.submitProblem.page.message
})

class SubmitProblemPage extends React.Component {
	render() {
		switch(this.props.stage) {
			case submitProblemStages.COMPLETED:
				return(
					<div>{this.props.message}</div>
				)
			case submitProblemStages.SUBMITTING_FORM:
			default:
				return(
					<div>
						<p>Submitting new problem to queue {this.props.queue}</p>
						<SubmitProblemForm queue={this.props.queue} token={this.props.token}/>
						<div>{this.props.message}</div>
					</div>
				)
		}
	}
}

export default connect(mapStateToProps)(SubmitProblemPage)
