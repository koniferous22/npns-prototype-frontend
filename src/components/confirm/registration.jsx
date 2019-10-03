import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmRegistrationActions } from '../../actions/content/confirm/registration'

const mapStateToProps = state => state.content.confirm.registration
const mapDispatchToProps = dispatch => ({
	confirm: token => dispatch(confirmRegistrationActions.confirm(token))
})

class ConfirmRegistrationPage extends React.Component {
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


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegistrationPage)