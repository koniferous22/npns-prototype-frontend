import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmPasswordChangeActions } from '../../actions/content/confirm/passwordChange'

const mapStateToProps = state => state.content.confirm.passwordChange
const mapDispatchToProps = dispatch => ({
	confirm: token => dispatch(confirmPasswordChangeActions.confirm(token))
})

class ConfirmPasswordChangePage extends React.Component {
	componentDidMount() {
		this.props.confirm(this.props.token)
	}

	render() {
		return (
			<div>
				{this.props.message && <p>{this.props.message}</p>}
				{this.props.verified && (<p> Continue to <Link to='/login'>Login</Link> </p>)}
			</div>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPasswordChangePage)