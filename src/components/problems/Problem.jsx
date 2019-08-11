import { appConfig } from '../../appConfig'
import React from 'react';
import { Link } from 'react-router-dom'

export default class Problem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			problem: []
		}
	}

	componentDidMount() {
		fetch(appConfig.backendUrl + "/problem/" + this.props.location.id, {
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
				<p>	 
           				{this.state.problem.map(q => (
                        <ul>
						    <li>Title: {q.title}</li>
						    <li>Description: {q.description}</li>
						    <li>Timestamp: {q.timestamp}</li>
						    <li>User ID: {q.userId}</li>
                        </ul>
					))}
				</p>
			</div>
		)
	}
}
