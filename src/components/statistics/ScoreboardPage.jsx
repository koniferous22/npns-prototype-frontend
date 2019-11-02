import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'
import QueueSidebar from '../queue/QueueSidebar'

import ScoreboardPageBar from './ScoreboardPage/ScoreboardPageBar'

import { scoreboardPageActions } from '../../actions/content/statistics/scoreboardPage'

const mapStateToProps = (state, ownProps) => state.content.statistics.scoreboard.page[ownProps.queue]

const mapDispatchToProps = (dispatch, ownProps) => ({
	setActivePage: (page) => dispatch(scoreboardPageActions.setActivePage(ownProps.queue, page)),
	findUser: (user) => dispatch(scoreboardPageActions.findUser(ownProps.queue, user, 50)),
	reset: () => dispatch(scoreboardPageActions.reset())
})

class ScoreboardPage extends React.Component {
	componentDidMount() {
		this.props.setActivePage(this.props.page)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.queue !== this.props.queue || prevProps.page !== this.props.page) {
			this.props.setActivePage(this.props.page)
		}
	}

	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		const scoreboardData = this.props.data || []
		const users = scoreboardData.map((user, index) => (
			<tr key={index}>
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
				{this.props.message}
				<table>
					<thead>
						<tr>
							<th>Username</th>
							<th>{'Score in "' + this.props.queue + '"'}</th>
						</tr>
					</thead>
					<tbody>
						{users}
					</tbody>
				</table>
				<ScoreboardPageBar currentPage={this.props.page} queue={this.props.queue}/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardPage)