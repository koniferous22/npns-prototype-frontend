import React from "react"
import { /*Route,*/ Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import { authActions } from '../../actions/auth'
import history from '../../history'

class Auth extends React.Component {
	componentDidMount() {
		this.props.verify(this.props.token)
	}
	
	render() {
		const { component: Component, loggedIn, token, ...rest } = this.props
		return loggedIn ? (
			<Component {...rest} />
		) : (
			<Redirect
				to={{
					pathname: "/login",
					state: { from: history.location.pathname }
				}}
			/>
		)
	}

}

const mapStateToProps = state => ({
	token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
	verify: token => dispatch(authActions.verify(token))
})



export default connect(mapStateToProps, mapDispatchToProps)(Auth)