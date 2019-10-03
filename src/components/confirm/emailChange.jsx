import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmEmailChangeActions } from '../../actions/content/confirm/emailChange'

const mapStateToProps = state => state.content.confirm.emailChange
const mapDispatchToProps = dispatch => ({
	confirm: (confirmationToken, authToken) => dispatch(confirmEmailChangeActions.confirm(confirmationToken, authToken))
})

class ConfirmEmailChangePage extends React.Component {
	componentDidMount() {
		this.props.confirm(this.props.token, this.props.authToken)
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


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailChangePage)