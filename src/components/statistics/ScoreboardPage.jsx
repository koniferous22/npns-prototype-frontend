import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'
import QueueSidebar from '../queue/QueueSidebar'

class ScoreboardPage extends React.Component {
	render() {
		console.log(this.props)
		return(
			<div>
				<StatisticsSidebar />
				<QueueSidebar baseUrl='/statistics/scoreboard'/>
				tmpscoreboard page
				{this.props.queue}
			</div>
		)
	}
}

export default ScoreboardPage