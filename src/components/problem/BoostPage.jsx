import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import Paypal from '../payment/Paypal'
import AdjustBoostForm from './BoostPage/AdjustBoostForm'
import { problemPageActions } from '../../actions/content/problemPage'
import { boostActions } from '../../actions/content/boost'
import { boostStages } from '../../constants/content/boost' 

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const mapStateToProps = (state, ownProps) => ({
	token: ownProps.token,
	problemId: ownProps.problemId,
	stage: state.content.boost.page.stage,
	message: state.content.boost.page.message,
	messageType: state.content.boost.page.messageType,
	boost: state.content.boost.page.boostValue,
	problem: state.content.problemPage.page.problem
})

const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(boostActions.reset()),
	loadProblemData: (id) => dispatch(problemPageActions.loadProblemData(id))
})

class BoostPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}
	componentDidMount() {
		this.props.loadProblemData(this.props.problemId)
	}
	render() {
		const message = this.props.message
		const messageType = this.props.messageType
		const problemId = this.props.problemId
		const token = this.props.token
		const problem = this.props.problem

		switch(this.props.stage) {
			case boostStages.PAYPAL:
				const product = {
					value: this.props.boost.value,
					name: 'Boost',
					description: 'Problem boost'
				}
				return(
					<ContentDiv>
						<BackendMessage messageType={messageType}>
							{message}
						</BackendMessage>
						<h3>
							<p>You are about to boost {problem.submitted_by.username}{"'"}s problem</p>
							<p><i>"{problem.title}"</i></p>
							<p>for ${product.value}.</p>
						</h3>
						<h4>Please choose one of the payment methods below:</h4>
						<Paypal product={product} problemId={problemId} token={token} />
					</ContentDiv>
				)
			case boostStages.COMPLETED:
				return(
					<ContentDiv>
						<BackendMessage messageType={messageType}>
							{message}
						</BackendMessage>
						<h3>Congratulations! You just boosted the problem.</h3>
						<p>Would you like to go back to <Link to={'/problem/' + problemId}>the problem you just boosted</Link>?</p>
					</ContentDiv>
				)
			case boostStages.BOOSTING:
			default:
				return(
					<ContentDiv>
						<CenteredDiv>
						<h3>How much do you wish to boost the problem? (in USD)</h3>
						</CenteredDiv>
						<AdjustBoostForm />
						<BackendMessage messageType={messageType}>
							{message}
						</BackendMessage>
					</ContentDiv>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BoostPage)
