import React from 'react';
import { Redirect } from 'react-router-dom'
import LoginPage from './LoginPage'

const Login = ({ loggedIn, redirect }) => {
	return (loggedIn === true) ? <Redirect to={redirect ? redirect : "/"}/> : <LoginPage />
}

export default Login
