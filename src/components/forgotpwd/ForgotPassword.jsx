import React from 'react'
import { connect } from 'react-redux'

import ForgotPasswordForm from './ForgotPasswordForm'
import { forgotPwdStages } from '../../constants/content/forgotPwdPage'
import { forgotPwdActions } from '../../actions/content/forgotPwdPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/BackendMessage'

const mapStateToProps = state => state.content.forgotPwd.page
const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(forgotPwdActions.reset())
})

class ForgotPassword extends React.Component { 
	componentWillUnmount() {
		this.props.reset()
	}
	render() {
		switch (this.props.stage) {
			case forgotPwdStages.EMAIL_SENT:
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
			case forgotPwdStages.SUBMITTING_FORM:
			default:
				return (
					<ContentDiv>
						<BackendMessage messageType={this.props.messageType}>
							{this.props.message}
						</BackendMessage>
						<ForgotPasswordForm />
					</ContentDiv>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
