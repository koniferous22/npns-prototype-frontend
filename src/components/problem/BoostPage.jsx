import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import BoostForm from './BoostPage/BoostForm'
import { boostActions } from '../../actions/content/boost'
import { boostStages } from '../../constants/content/boost' 

import ContentDiv from '../../styled-components/defaults/ContentDiv'

const mapStateToProps = (state, ownProps) => ({
	token: ownProps.token,
	problemId: ownProps.problemId,
	stage: state.content.boost.page.stage,
	message: state.content.boost.page.message,
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
		const problemId = this.props.problemId
		const token = this.props.token
		switch(this.props.stage) {
			case boostStages.COMPLETED:
				return(
					<ContentDiv>
						{message}
						<p>Would you like to go back to <Link to={'/problem/' + problemId}>the problem you just boosted</Link>?</p>
					</ContentDiv>

				)
			case boostStages.BOOSTING:
			default:
				return(
					<ContentDiv>
						<p>Boosting problem</p>
						<BoostForm problemId={problemId} token={token}/>
						<div>{message}</div>
					</ContentDiv>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BoostPage)
