import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'

import { submitProblemStages } from '../../constants/content/submitProblemPage' 

const mapStateToProps = (state, ownProps) => ({
	queue: ownProps.queue,
	token: ownProps.token,
	stage: state.content.submitProblem.page.stage,
	message: state.content.submitProblem.page.message,
	problemId: state.content.submitProblem.page.problemId
})
//mozno to tu bude chciet reset, po submitnuti problemu totiz tato page zostane na COMPLETED case a nezmeni sa dokym nereloadnem
class SubmitProblemPage extends React.Component {
	render() {
		const queue = this.props.queue
		const message = this.props.message
		const problemId = this.props.problemId
		const token = this.props.token
		switch(this.props.stage) {
			case submitProblemStages.COMPLETED:
				return(
					<div>
						{message}
						<p>Would you like to check out <Link to={'/problem/' + problemId}>your submitted problem</Link> or <Link to={'/q/' + queue}>the {queue} queue</Link>?</p>
					</div>

				)
			case submitProblemStages.SUBMITTING_FORM:
			default:
				return(
					<div>
						<p>Submitting new problem to queue {queue}</p>
						<SubmitProblemForm queue={queue} token={token}/>
						<div>{message}</div>
					</div>
				)
		}
	}
}

export default connect(mapStateToProps)(SubmitProblemPage)
