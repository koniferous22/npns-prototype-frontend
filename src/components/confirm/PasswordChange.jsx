import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmPasswordChangeStages } from '../../constants/content/confirm/passwordChange'

import { confirmPasswordChangeActions } from '../../actions/content/confirm/passwordChange'

import PasswordChangeForm from './PasswordChange/PasswordChangeForm'

import ContentDiv from '../../styled-components/defaults/ContentDiv'

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
					<ContentDiv>
						Password successfully changed, click
						<Link to="/login">here</Link>
						to log in
					</ContentDiv>
				)
			case confirmPasswordChangeStages.SUBMITTING_FORM:
				return (
					<ContentDiv>
						{this.props.message}
						<PasswordChangeForm token={this.props.token} />
					</ContentDiv>
				)
			case confirmPasswordChangeStages.INVALID_TOKEN:
			default:
				return (
					<ContentDiv>
						{this.props.message}
					</ContentDiv>
				)
		}
	}
} 


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordChangePage)