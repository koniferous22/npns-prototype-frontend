import React from 'react'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'

const mapStateToProps = state => ({
	message: state.auth.message
})

const LoginPage = (props) => (
	<div>
		{props.message}
		<LoginForm/>
	</div>
)

export default connect(mapStateToProps)(LoginPage)