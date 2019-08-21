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
	}
	render() {
		fetch(appConfig.backendUrl + "/queue/" + (this.props.queueName || 'Index') + '/problems', {
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
		}).then(response => {           //toto je tu, lebo na Array nejde len tak pouzit === ... strasne cosi
            if (this.state.problemz.length !== response.length && this.state.problemz.sort().every(function(value, index) { return value !== response.sort()[index]})) {
			    this.setState({problemz:response})
            }
			console.log(this.state)
		})
		return (
			<div>
				<ul>
					{this.state.problemz.map(q => (
                        <li><Link to={{pathname: "/problem/" + q._id, id: q._id}}>{q.title}</Link></li>
					))}
				</ul>
			</div>
		)
	}
}

//uz mi to skoro funguje, len to hadze 2 requesty a to je dost blbe...
