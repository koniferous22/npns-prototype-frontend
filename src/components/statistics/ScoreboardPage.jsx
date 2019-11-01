import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'
import QueueSidebar from '../queue/QueueSidebar'

import { scoreboardPageActions } from '../../actions/content/statistics/scoreboardPage'

const mapStateToProps = state => state.content.statistics.scoreboardPage

const mapDispatchToProps = (dispatch, ownProps) => ({
	setActivePage: (page) => dispatch(scoreboardPageActions.setActivePage(ownProps.queue, ownProps.token, page)),
	findUser: (user) => dispatch(scoreboardPageActions.findUser(ownProps.queue, ownProps.token, user, 50))
})

class ScoreboardPage extends React.Component {
	componentDidMount() {
		this.props.setActivePage(this.props.page)
	}

	render() {

		const users = this.props.data.map((user, index) => (
			<tr>
				<td>
					<Link to={'/u/' + user.username}>{user.username}</Link>
				</td>
				<td>
					{user[this.props.queue]}
				</td>
			</tr>
		))
		return(
			<div>
				<StatisticsSidebar />
				<QueueSidebar baseUrl='/statistics/scoreboard'/>
				<table>
					<tr>
						<th>Username</th>
						<th>{'Score in "' + this.props.queue + '"'}</th>
					</tr>
					{users}
				</table>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardPage)