import React from 'react';
import { Link } from 'react-router-dom'

import StyledProblemBox from '../../styled-components/problem-related/ProblemBox'
import ProblemBoxMeta from '../../styled-components/problem-related/ProblemBoxMeta'
import SolvedLabel from '../../styled-components/problem-related/SolvedLabel'

export const ProblemBox = ({ title, created, bounty, active, loggedIn, id, viewCount, submissionCount, username }) => {
	const displayedTitle = title.length > 45 ? title.substring(0, 45) + '...' : title
	return (
		<StyledProblemBox>
			<ProblemBoxMeta>
				<li>{new Date(created).toLocaleDateString()}</li>
				<li>{'Bounty: ' + bounty.toFixed(2) + ' €'}</li>
				<li>
					{!active ? <SolvedLabel>SOLVED</SolvedLabel> : (
						loggedIn && <Link to={{pathname: '/problem/' + id + '/boost'}}>Boost</Link>
					)}
				</li>
			</ProblemBoxMeta>
			<h4><Link to={{pathname: "/problem/" + id, id: id}}>{displayedTitle}</Link></h4>
			<ProblemBoxMeta>
				<li>{viewCount + ' view' + ((viewCount !== 1) ? 's' : '')}</li>
				<li>{'Replies: ' + submissionCount}</li>
				<li><Link to={'/u/' + username}>{username}</Link></li>
			</ProblemBoxMeta>
		</StyledProblemBox>
	)
}
