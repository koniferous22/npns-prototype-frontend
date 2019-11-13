import React from 'react';
import { connect } from 'react-redux'

import SignUpForm from './SignUpForm'
import { signupStages } from '../../constants/content/signUpPage'
import { signupActions } from '../../actions/content/signup'

import ContentDiv from '../../styled-components/defaults/ContentDiv'

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
					<div>
						{this.props.message.message}
						<ol>
							{this.props.message.steps.map((step, i) => (
								<li key={i}>{step}</li>
							))}
						</ol>
					</div>
				)
			case signupStages.SUBMITTING_FORM:
			default:
				return (
					<ContentDiv>
						{this.props.message}
						<h1>REGISTRUJ SA PRIATELU</h1>
						<SignUpForm />
					</ContentDiv>
				)
		}
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(SignUpPage)
