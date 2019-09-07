import React from 'react'
/*import { authActions } from '../../actions/auth'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		loggedIn: !!state.auth.user,
		token: state.auth.token
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		logout: token => {
			dispatch(authActions.logout(token))
		}
	}
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return {
		loggedIn: stateProps.loggedIn,
		logout: () => {
			dispatchProps.logout(stateProps.token)
		}
	}
}*/

const LogoutButton = /*connect(mapStateToProps, mapDispatchToProps,mergeProps)*/(({loggedIn,logout}) => {
	if (loggedIn) {
		return <button onClick={logout}>Log out</button>
	}
	return <p>Oi maite show mai yar login loicense</p>
});


export default LogoutButton
