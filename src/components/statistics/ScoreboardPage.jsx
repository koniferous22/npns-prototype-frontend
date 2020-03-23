import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from "react-router-dom"

import StatisticsSidebar from './StatisticsSidebar'

import ScoreboardPageBar from './ScoreboardPage/ScoreboardPageBar'
import ScoreboardSearchUserForm from './ScoreboardPage/ScoreboardSearchUserForm'

import { /*findUser,*/ setActivePage, reset } from '../../store/content/statistics/scoreboardPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'
import NumberedTable from '../../styled-components/statistics/NumberedTable'

const ScoreboardPage = ({
	token,
	queue,
	urlPage,
	loggedIn
}) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setActivePage(queue, urlPage))
		return () => {
			dispatch(reset())
		}
	}, [urlPage, queue, dispatch])
	const {
		data,
		activePage,
		message,
		messageType,
		highlight,
		userFlag
	} = useSelector((state) => state.content.statistics.scoreboard.page[queue] || {})
	if (userFlag === true && activePage !== urlPage) {
		return <Redirect to={'/statistics/scoreboard/' + queue + '?page=' + activePage + '&highlight=' + highlight} />
	}
	const scoreboardData = data || []
	const users = scoreboardData.map((user, index) => (
		<tr key={index}>
			<td>
				<Link to={'/u/' + user.username}>{user.username}</Link>
			</td>
			<td>
				{user[queue]}
			</td>
		</tr>
	))
	return(
		<PageDiv>
			<StatisticsSidebar addQueues queueBaseUrl='/statistics/scoreboard'/>
			<ContentDiv sidebar>
				<CenteredDiv fullWidth>
					<BackendMessage messageType={messageType}>
						{message}
					</BackendMessage>
					<ScoreboardSearchUserForm queue={queue} />
					<ScoreboardPageBar currentPage={urlPage} queue={queue}/>
					<NumberedTable>
						<thead>
							<tr>
								<th>Username</th>
								<th>{'Score in "' + queue + '"'}</th>
							</tr>
						</thead>
						<tbody>
							{users}
						</tbody>
					</NumberedTable>
					<ScoreboardPageBar currentPage={urlPage} queue={queue}/>
				</CenteredDiv>
			</ContentDiv>
		</PageDiv>
	)
}

export default ScoreboardPage