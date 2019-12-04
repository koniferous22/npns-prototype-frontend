import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"

import SubmitProblemForm from './SubmitProblemPage/SubmitProblemForm'
import { submitProblemActions } from '../../actions/content/submitProblem'
import { submitProblemStages } from '../../constants/content/submitProblemPage'
import MarkdownRender from '../form/MarkdownRender'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

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
					<ContentDiv>
						<BackendMessage messageType={page.messageType}>
							{page.message}
						</BackendMessage>
						<p>Would you like to check out <Link to={'/problem/' + page.problemId}>your submitted problem</Link> or the <Link to={'/q/' + page.queue}>{page.queue} queue</Link>?</p>
					</ContentDiv>

				)
			case submitProblemStages.SUBMITTING_FORM:
			default:
				return(
					<ContentDiv>
						<CenteredDiv>
							Submitting new problem
						</CenteredDiv>
						<SubmitProblemForm defaultQueue={this.props.urlQueue || 'Index'} token={this.props.token} queueOptions={page.queueOptions}/>
						<CenteredDiv>
							<BackendMessage messageType={page.messageType}>
								{page.message}
							</BackendMessage>
						</CenteredDiv>
						{
							form && form.values && (
								<div>
									{(form.values.title || form.values.description) && <p>Preview</p>}
									<h3>{form.values.title}</h3>
									<MarkdownRender source={form.values.description} />
								</div>
							)
						}
					</ContentDiv>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitProblemPage)
