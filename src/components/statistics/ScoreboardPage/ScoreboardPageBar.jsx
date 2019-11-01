import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

import { scoreboardPageActions } from '../../../actions/content/statistics/scoreboardPage'

const mapStateToProps = state => ({
	count: state.content.statistics.scoreboardPage.pageCount
})

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
			<div>
				<Link to={baseUrl + begin}>{'<<'}</Link>
				<br/>
				<Link to={baseUrl + prev}>{'<'}</Link>
				<br/>
				<Link to={baseUrl + next}>{'>'}</Link>
				<br/>
				<Link to={baseUrl + end}>{'>>'}</Link>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreboardPageBar)