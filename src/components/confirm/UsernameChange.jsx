import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmUsernameChangeActions } from '../../actions/content/confirm/usernameChange'

const mapStateToProps = state => state.content.confirm.usernameChange
const mapDispatchToProps = dispatch => ({
	confirm: (confirmationToken) => dispatch(confirmUsernameChangeActions.confirm(confirmationToken))
})

class ConfirmUsernameChangePage extends React.Component {
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


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUsernameChangePage)