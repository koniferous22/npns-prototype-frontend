import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginForm from './LoginForm'

const Login = ({loggedIn, ...rest}) => {
	console.log(rest)
	return (loggedIn === true) ? <Redirect to="/"/> : <LoginForm />
}

export default Login;

