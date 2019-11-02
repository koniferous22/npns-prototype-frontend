import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'
import { submitProblemActions } from '../../actions/content/submitProblem'
import { submitProblemStages } from '../../constants/content/submitProblemPage' 

const mapStateToProps = state => state.content.submitProblem.page

const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(submitProblemActions.reset()),
	fetchDropdownValues: () => dispatch(submitProblemActions.fetchDropdownValues())
})

class SubmitProblemPage extends React.Component {
	componentDidMount() {
		this.props.fetchDropdownValues()
	}

	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		switch(this.props.stage) {
			case submitProblemStages.COMPLETED:
				return(
					<div>
						{this.props.message}
						<p>Would you like to check out <Link to={'/problem/' + this.props.problemId}>your submitted problem</Link> or the <Link to={'/q/' + this.props.queue}>{this.props.queue} queue</Link>?</p>
					</div>

				)
			case submitProblemStages.SUBMITTING_FORM:
			default:
				return(
					<div>
						<p>Submitting new problem</p>
						<SubmitProblemForm defaultQueue={this.props.urlQueue || 'Index'} token={this.props.token} queueOptions={this.props.queueOptions}/>
						<div>{this.props.message}</div>
					</div>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProblemPage)
