import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom"

import { scoreboardPageActions } from '../../../actions/content/statistics/scoreboardPage'

import StyledScoreboardPageBar from '../../../styled-components/statistics/ScoreboardPageBar'

const ScoreboardPageBar = ({ currentPage, queue }) => {
	const scoreboardQueueReducer = useSelector(state => state.content.statistics.scoreboard.page[queue])
	const count = (scoreboardQueueReducer ? scoreboardQueueReducer.pageCount : 1)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(scoreboardPageActions.getNumberOfPages(queue))
	}, [dispatch, queue])

	if (!count || count < 1) {
		return <div/>
	}
	const current = currentPage || 1
	const begin = 1
	const end = count
	const prev = current > 1 ? (current > end ? end : current - 1) : begin
	const next = (current < end) ? (current < begin ? begin : current + 1) : end
	const baseUrl = '/statistics/scoreboard/' + queue + '?page='
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

export default ScoreboardPageBar
