import React from 'react'
import { useSelector } from 'react-redux'
import LoginForm from './LoginForm'
import { Link } from "react-router-dom"

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const LoginPage = () => {
	const { message, messageType } = useSelector(state => state.auth)
	return(
		<ContentDiv>
			<CenteredDiv>
				<BackendMessage messageType={messageType}>
					{message}
				</BackendMessage>
			</CenteredDiv>
			<LoginForm/>
			<CenteredDiv>
				<Link to="/forgotpwd" >Forgot Password?</Link>
			</CenteredDiv>
		</ContentDiv>
	)
}

export default LoginPage
