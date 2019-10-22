import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { Link } from "react-router-dom"

const mapStateToProps = state => ({
	message: state.auth.message
})

const LoginPage = (props) => (
	<div>
		{props.message}
		<LoginForm/>
		<Link to="/forgotpwd" >Forgot Password?</Link>
	</div>
)

export default connect(mapStateToProps)(LoginPage)