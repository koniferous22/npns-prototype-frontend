import React from 'react';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

const mapStateToProps = state => {
	return {
		loggedIn: !!state.auth.user
	}
}

const Login = withRouter(connect(mapStateToProps)(({loggedIn, history}) => {
	if (loggedIn === true) {
		return <Redirect to="/"/>
	}
	return <LoginForm />
}))

export default Login;

