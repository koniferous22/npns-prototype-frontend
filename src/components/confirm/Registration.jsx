import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmRegistrationActions } from '../../actions/content/confirm/registration'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/BackendMessage'

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
			<ContentDiv>
				<BackendMessage messageType={this.props.messageType}>
					{this.props.message && <p>{this.props.message}</p>}
				</BackendMessage>
				{this.props.verified && (<p> Continue to <Link to='/login'>Login</Link> </p>)}
			</ContentDiv>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmRegistrationPage)
