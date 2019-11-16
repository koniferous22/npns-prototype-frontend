import React from 'react';
import { connect } from 'react-redux'

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
				return (
					<ContentDiv>
						<BackendMessage messageType={this.props.messageType}>
							{this.props.message}
						</BackendMessage>
						<h1>REGISTRUJ SA PRIATELU</h1>
						<SignUpForm />
					</ContentDiv>
				)
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
