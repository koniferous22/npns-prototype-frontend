import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmUsernameChangeActions } from '../../actions/content/confirm/usernameChange'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

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
			<ContentDiv>
				<BackendMessage messageType={this.props.messageType}>
					{this.props.message && <p>{this.props.message}</p>}
				</BackendMessage>
				{this.props.verified && (<p> Continue to <Link to='/login'>Login</Link> </p>)}
			</ContentDiv>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmUsernameChangePage)
