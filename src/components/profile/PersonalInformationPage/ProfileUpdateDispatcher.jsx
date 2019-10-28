import React from 'react'

import { personalInformationPageActions } from '../../../actions/content/profile/personalInformationPage'

import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch, ownProps) => {
	console.log(ownProps	)
	switch (ownProps.form) {
		case 'email':
			return {
				send: () => dispatch(personalInformationPageActions.submitEmailChange(ownProps.values.email, ownProps.token))
			}
		case 'password':
			return {
				send: () => dispatch(personalInformationPageActions.submitPasswordChange(ownProps.user))
			}
		default:
			return {
				send: () => {throw new Error('wut?')}
			}
	}
}

class ProfileUpdateDispatcher extends React.Component {
	componentDidMount() {
		this.props.send()
	}
	render() {
		return <div/>
	}
}

export default connect(null, mapDispatchToProps)(ProfileUpdateDispatcher)