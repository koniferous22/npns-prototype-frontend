import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'
import QueueSidebar from '../queue/QueueSidebar'

import ScoreboardPageBar from './ScoreboardPage/ScoreboardPageBar'
import ScoreboardSearchUserForm from './ScoreboardPage/ScoreboardSearchUserForm'

import { scoreboardPageActions } from '../../actions/content/statistics/scoreboardPage'

const mapStateToProps = (state, ownProps) => state.content.statistics.scoreboard.page[ownProps.queue] || {}

const mapDispatchToProps = (dispatch, ownProps) => ({
	setActivePage: (page) => dispatch(scoreboardPageActions.setActivePage(ownProps.queue, page)),
	findUser: (user) => dispatch(scoreboardPageActions.findUser(ownProps.queue, user, 50)),
	reset: () => dispatch(scoreboardPageActions.reset())
})

class ScoreboardPage extends React.Component {
	componentDidMount() {
		this.props.setActivePage(this.props.urlPage)
	}

	componentDidUpdate(prevProps) {
		if (prevProps.queue !== this.props.queue || prevProps.urlPage !== this.props.urlPage) {
			this.props.setActivePage(this.props.urlPage)
		}
	}

	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		if (this.props.userFlag === true && this.props.activePage !== this.props.urlPage) {
			return <Redirect to={'/statistics/scoreboard/' + this.props.queue + '?page=' + this.props.activePage + '&highlight=' + this.props.highlight} />
		}
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
				<ScoreboardSearchUserForm queue={this.props.queue} />
				<ScoreboardPageBar currentPage={this.props.urlPage} queue={this.props.queue}/>
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
				<ScoreboardPageBar currentPage={this.props.urlPage} queue={this.props.queue}/>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardPage)