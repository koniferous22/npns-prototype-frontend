import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"

import Paypal from '../payment/Paypal'
import Transparency from './BoostPage/Transparency'
import calculatePayment from '../payment/calculatePayment'
import AdjustBoostForm from './BoostPage/AdjustBoostForm'
import { problemPageActions } from '../../actions/content/problemPage'
import { boostActions } from '../../actions/content/boost'
import { boostStages } from '../../constants/content/boost' 

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const BoostPage = ({ problemId, token }) => {
	const { stage, message, messageType, boostValue } = useSelector(state => state.content.boost.page)
	const { problem } = useSelector(state => state.content.problemPage.page)
	const dispatch = useDispatch()

	useEffect(() => { 
		dispatch(problemPageActions.loadProblemData(problemId))
		return () => { 
			dispatch(boostActions.reset())
		}; 
	}, [dispatch, problemId]); 

	switch(stage) {
		case boostStages.PAYPAL:
			const payment = calculatePayment(boostValue.value)
			const product = {
				value: payment.requiredPayment,
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
						<p>by {payment.boost} € for {product.value} €.</p>
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
					<h3>How much do you wish to boost the problem? (in EUR)</h3>
					</CenteredDiv>
					<AdjustBoostForm />
					{boostValue && boostValue.value >= 1 && <Transparency boost={boostValue.value} />}
					<BackendMessage messageType={messageType}>
						{message}
					</BackendMessage>
				</ContentDiv>
			)
	}
}

export default BoostPage
