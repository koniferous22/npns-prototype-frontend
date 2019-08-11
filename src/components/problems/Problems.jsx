import React from 'react';
import { Link } from 'react-router-dom'
import { appConfig } from '../../appConfig'

export default class Problems extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			problemz: []
		}
	}

	componentDidMount() {
		fetch(appConfig.backendUrl + "/problem/allinqueue/" + this.props.id, {
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
			this.setState({problemz:response})
			console.log(this.state)
		})
	}
	render() {
		return (
			<div>
				<p>
					{this.state.problemz.map(q => (
                        <li><Link to={{pathname: "/problem/" + q._id, id: q._id}}>{q.title}</Link></li>
					))}
				</p>
			</div>
		)
	}
}
