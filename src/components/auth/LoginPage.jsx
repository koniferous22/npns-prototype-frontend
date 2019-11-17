import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import { Link } from "react-router-dom"

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const mapStateToProps = state => ({
	message: state.auth.message,
	messageType: state.auth.messageType
})

const LoginPage = (props) => (
	<ContentDiv>
		<CenteredDiv>
			<BackendMessage messageType={props.messageType}>
				{props.message}
			</BackendMessage>
		</CenteredDiv>
		<LoginForm/>
		<CenteredDiv>
			<Link to="/forgotpwd" >Forgot Password?</Link>
		</CenteredDiv>
	</ContentDiv>
)

export default connect(mapStateToProps)(LoginPage)
