import React from 'react'
import { connect } from 'react-redux'


import ForgotPasswordForm from './ForgotPasswordForm'

import { forgotPwdStages } from '../../constants/content/forgotPwdPage'

const mapStateToProps = state => state.content.forgotPwd.page

const ForgotPassword = props => {
	switch (props.stage) {
		case forgotPwdStages.EMAIL_SENT:
			return (
				<div>
					{props.message}
				</div>
				)
		case forgotPwdStages.SUBMITTING_FORM:
		default:
			return (
				<div>
					{props.message}
					<ForgotPasswordForm />
				</div>
			)
	}
}

export default connect(mapStateToProps)(ForgotPassword)