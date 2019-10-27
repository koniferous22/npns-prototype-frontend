import React from 'react'
import { connect } from 'react-redux'


import ForgotPasswordForm from './ForgotPasswordForm'

import { forgotPwdStages } from '../../constants/content/forgotPwdPage'

import { forgotPwdActions } from '../../actions/content/forgotPwdPage'

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
					<div>
						{this.props.message.message}
						<ol>
							{this.props.message.steps.map((step, i) => (
								<li key={i}>{step}</li>
							))}
						</ol>
					</div>
					)
			case forgotPwdStages.SUBMITTING_FORM:
			default:
				return (
					<div>
						{this.props.message}
						<ForgotPasswordForm />
					</div>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)