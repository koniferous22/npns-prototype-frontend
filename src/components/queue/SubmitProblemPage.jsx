import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'
import { submitProblemActions } from '../../actions/content/submitProblem'
import { submitProblemStages } from '../../constants/content/submitProblemPage' 

const mapStateToProps = state => state.content.submitProblem

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
		const page = this.props.page
		const form = this.props.form.form
		switch(page.stage) {
			case submitProblemStages.COMPLETED:
				return(
					<div>
						{page.message}
						<p>Would you like to check out <Link to={'/problem/' + page.problemId}>your submitted problem</Link> or the <Link to={'/q/' + page.queue}>{page.queue} queue</Link>?</p>
					</div>

				)
			case submitProblemStages.SUBMITTING_FORM:
			default:
				console.log('lulik')
				return(
					<div>
						<p>Submitting new problem</p>
						<SubmitProblemForm defaultQueue={this.props.urlQueue || 'Index'} token={this.props.token} queueOptions={page.queueOptions}/>
						<div>{page.message}</div>
						<div>
							<p>Preview</p>
							{form && form.values && <h3>{form.values.title}</h3>}
							<p>{form && form.values && <ReactMarkdown source={form.values.description} />}</p>
						</div>
					</div>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProblemPage)
