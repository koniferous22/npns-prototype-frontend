import { appConfig } from '../../appConfig'
import React from 'react';

export default class Problem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			problem: []
		}
        console.log(props)
	}

	componentDidMount() {
		fetch(appConfig.backendUrl + this.props.location.pathname, {
			method: 'GET'
		}).then(response => {
			if (response.status < 400) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
		}).then(response => {
			return response.json()
		}).then(response => {
			this.setState({problem:response})
			console.log(this.state)
		})
	}
	render() {
		return (
			<div>
                    <ul>
					    <li>Title: {this.state.problem.title}</li>
					    <li>Description: {this.state.problem.description}</li>
					    <li>Created: {this.state.problem.created}</li>
					    <li>User ID: {this.state.problem.submitted_by}</li>
                    </ul>
			</div>
		)
	}
}
