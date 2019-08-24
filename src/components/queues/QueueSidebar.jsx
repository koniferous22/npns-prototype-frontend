import React from 'react';
import { connect } from 'react-redux'
import { queueActions } from '../../actions/queue-actions'
import { appConfig } from '../../appConfig'
import QueueSidebarEntries from './QueueSidebarEntries'

export default class QueueSidebar extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			queues: {}
		}
	}

	componentDidMount() {
		fetch(appConfig.backendUrl + "/queue/hierarchy", {
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
			this.setState({queues:response.hierarchy})
		})
	}
	render() {
		return (
			<div>
          <QueueSidebarEntries queues={this.state.queues}/>
			</div>
		)
	}
}
