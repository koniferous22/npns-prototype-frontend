import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmPasswordChangeStages } from '../../constants/content/confirm/passwordChange'

import { confirmPasswordChangeActions } from '../../actions/content/confirm/passwordChange'

import PasswordChangeForm from './PasswordChange/PasswordChangeForm'

const mapStateToProps = state => state.content.confirm.passwordChange.page

const mapDispatchToProps = dispatch => ({
	verify: (token) => dispatch(confirmPasswordChangeActions.verify(token)),
	reset: () => dispatch(confirmPasswordChangeActions.reset())
})

class ConfirmPasswordChangePage extends React.Component {
	componentDidMount() {
		this.props.verify(this.props.token)
	}

	componentWillUnmount(){
		this.props.reset()
	}

	render() {	
		switch (this.props.stage) {
			case confirmPasswordChangeStages.COMPLETED:
				return (
					<div>
						Password successfully changed, click
						<Link to="/login">here</Link>
						to log in
					</div>
				)
			case confirmPasswordChangeStages.SUBMITTING_FORM:
				return (
					<div>
						{this.props.message}
						<PasswordChangeForm token={this.props.token} />
					</div>
				)
			case confirmPasswordChangeStages.INVALID_TOKEN:
			default:
				return (
					<div>
						{this.props.message}
					</div>
				)
		}
	}
} 


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordChangePage)