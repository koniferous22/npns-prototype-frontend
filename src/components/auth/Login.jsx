import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import LoginPage from './LoginPage'
import AuthContext from '../../AuthContext'


const Login = ({ redirect }) => {
  const { loggedIn } = useContext(AuthContext);
	return (loggedIn === true) ? <Redirect to={redirect ? redirect : "/"}/> : <LoginPage />
}

export default Login
