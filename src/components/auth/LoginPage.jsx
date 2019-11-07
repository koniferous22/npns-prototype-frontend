import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { Link } from "react-router-dom"

import ContentDiv from '../../styled-components/defaults/ContentDiv'

const mapStateToProps = state => ({
	message: state.auth.message
})

const LoginPage = (props) => (
	<ContentDiv>
		{props.message}
		<LoginForm/>
		<Link to="/forgotpwd" >Forgot Password?</Link>
	</ContentDiv>
)

export default connect(mapStateToProps)(LoginPage)