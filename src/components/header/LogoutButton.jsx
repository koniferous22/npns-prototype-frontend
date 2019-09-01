import React from 'react'
import { userActions } from '../../actions/user-actions'
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
			dispatch(userActions.logout(token))
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
}

const LogoutButton = connect(mapStateToProps, mapDispatchToProps,mergeProps)(({loggedIn,logout}) => {
	if (loggedIn) {
		return <button onClick={logout}>Log out</button>
	}
	return <p>Oi maite show mai yar login loicense</p>
});


export default LogoutButton
