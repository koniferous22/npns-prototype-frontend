import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import queryString from 'query-string'

import SignUpForm from './SignUpForm'
import { signupStages } from '../../constants/content/signUpPage'
import { signupActions } from '../../actions/content/signup'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const mapStateToProps = state => state.content.signup.page

const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(signupActions.reset())
})

class SignUpPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}
	render() {
		switch(this.props.stage) {
			case signupStages.COMPLETED:
				return (
					<ContentDiv>
						<BackendMessage messageType={this.props.messageType}>
							{this.props.message.message}
						</BackendMessage>
						<ol>
							{this.props.message.steps.map((step, i) => (
								<li key={i}>{step}</li>
							))}
						</ol>
					</ContentDiv>
				)
			case signupStages.SUBMITTING_FORM:
			default:
				const referred_by = queryString.parse(this.props.location.search).referred_by
				return (
					<ContentDiv>
						<BackendMessage messageType={this.props.messageType}>
							{this.props.message}
						</BackendMessage>
						<h1>REGISTRUJ SA PRIATELU</h1>
						<SignUpForm initialValues={{referred_by: referred_by}} />
					</ContentDiv>
				)
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpPage))
