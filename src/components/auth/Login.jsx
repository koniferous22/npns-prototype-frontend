import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = (props) => {
	return (props.loggedIn === true) ? <Redirect to={props.redirect ? props.redirect : "/"}/> : <LoginForm />
}

export default Login;

