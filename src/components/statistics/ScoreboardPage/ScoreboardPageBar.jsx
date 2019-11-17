import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import { scoreboardPageActions } from '../../../actions/content/statistics/scoreboardPage'

import StyledScoreboardPageBar from '../../../styled-components/statistics/ScoreboardPageBar'

const mapStateToProps = (state, ownProps) => {
	const scoreboardQueueReducer = state.content.statistics.scoreboard.page[ownProps.queue]
	return {
		count: scoreboardQueueReducer ? scoreboardQueueReducer.pageCount : 1
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	getNumberOfPages: () => dispatch(scoreboardPageActions.getNumberOfPages(ownProps.queue, ownProps.token))
})

class ScoreboardPageBar extends React.Component {
	componentDidMount() {
		this.props.getNumberOfPages()
	}

	render() {
		if (!this.props.count || this.props.count < 1) {
			return <div/>
		}
		const current = this.props.currentPage || 1
		const begin = 1
		const end = this.props.count
		const prev = current > 1 ? (current > end ? end : current - 1) : begin
		const next = (current < end) ? (current < begin ? begin : current + 1) : end
		const baseUrl = '/statistics/scoreboard/' + this.props.queue + '?page='
		return (
			<StyledScoreboardPageBar>
				<tbody>
					<tr>
						<td><Link to={baseUrl + begin}>{'<<'}</Link></td>
						<td><Link to={baseUrl + prev}>{'<'}</Link></td>
						<td><Link to={baseUrl + next}>{'>'}</Link></td>
						<td><Link to={baseUrl + end}>{'>>'}</Link></td>
					</tr>
				</tbody>
			</StyledScoreboardPageBar>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardPageBar)