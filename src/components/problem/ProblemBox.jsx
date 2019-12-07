import React from 'react';
import { Link } from 'react-router-dom'

import StyledProblemBox from '../../styled-components/problem-related/ProblemBox'
import ProblemBoxMeta from '../../styled-components/problem-related/ProblemBoxMeta'
import SolvedLabel from '../../styled-components/problem-related/SolvedLabel'

export const ProblemBox = (props) => {
	const displayedTitle = props.title.length > 45 ? props.title.substring(0, 45) + '...' : props.title
	return (
		<StyledProblemBox>
			<ProblemBoxMeta>
				<li>{new Date(props.created).toLocaleDateString()}</li>
				<li>{'Bounty: ' + props.bounty + '$'}</li>
				<li>
					{!props.active ? <SolvedLabel>SOLVED</SolvedLabel> : (
						props.loggedIn && <Link to={'/problem/' + props.id + '/boost'}>Boost</Link>
					)}
				</li>
			</ProblemBoxMeta>
			<h4><Link to={{pathname: "/problem/" + props.id, id: props.id}}>{displayedTitle}</Link></h4>
			<ProblemBoxMeta>
				<li>{props.viewCount + ' view' + ((props.viewCount !== 1) ? 's' : '')}</li>
				<li>{'Replies: ' + props.submissionCount}</li>
				<li><Link to={'/u/' + props.username}>{props.username}</Link></li>
			</ProblemBoxMeta>
		</StyledProblemBox>
	)
}