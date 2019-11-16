import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { confirmEmailChangeActions } from '../../actions/content/confirm/emailChange'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const mapStateToProps = state => state.content.confirm.emailChange
const mapDispatchToProps = dispatch => ({
	confirm: (confirmationToken) => dispatch(confirmEmailChangeActions.confirm(confirmationToken))
})

class ConfirmEmailChangePage extends React.Component {
	componentDidMount() {
		this.props.confirm(this.props.token)
	}

	render() {
		return (
			<ContentDiv>
		    <BackendMessage messageType={this.props.messageType}>
					{this.props.message}
		    </BackendMessage>
				{this.props.verified && (<div> Continue to <Link to='/login'>Login</Link> </div>)}
			</ContentDiv>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailChangePage)
