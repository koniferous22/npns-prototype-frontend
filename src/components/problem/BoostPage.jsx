import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import Paypal from '../payment/Paypal'
import AdjustBoostForm from './BoostPage/AdjustBoostForm'
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
	boost: state.content.boost.page.boostValue
})

const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(boostActions.reset())
})

class BoostPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}
	render() {
		const message = this.props.message
		const messageType = this.props.messageType
		const problemId = this.props.problemId
		const token = this.props.token

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
						<h3>Please choose one of the following payment methods.</h3>
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
						<h3>Here you can boost the problem. How much do you wish to boost your problem? (in USD)</h3>
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
