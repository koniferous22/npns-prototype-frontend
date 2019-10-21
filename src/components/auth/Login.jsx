import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginPage from './LoginPage'

const Login = (props) => {
	return (props.loggedIn === true) ? <Redirect to={props.redirect ? props.redirect : "/"}/> : <LoginPage />
}

export default Login;

