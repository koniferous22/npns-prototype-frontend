import React from 'react';
import RegistrationForm from './RegistrationForm'

export default class Register extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h1>REGISTRUJ SA PRIATELU</h1>
				<RegistrationForm />
			</div>
		)
	}
}
