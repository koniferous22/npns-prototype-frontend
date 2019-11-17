import React from 'react';
import { Link } from 'react-router-dom'

import StyledProblemBox from '../../styled-components/problem-related/ProblemBox'
import ProblemBoxMeta from '../../styled-components/problem-related/ProblemBoxMeta'
import SolvedLabel from '../../styled-components/problem-related/SolvedLabel'

export const ProblemBox = (props) => (
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
		<Link to={{pathname: "/problem/" + props.id, id: props.id}}>{props.title}</Link>
		<ProblemBoxMeta>
			<li>{props.viewCount + ' views'}</li>
			<li>{'Replies: ' + props.submissionCount}</li>
			<li><Link to={'/u/' + props.username}>{props.username}</Link></li>
		</ProblemBoxMeta>
	</StyledProblemBox>
)
