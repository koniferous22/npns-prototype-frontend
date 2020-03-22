import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import MarkdownRender from '../../form/MarkdownRender'

import Submission from './Submission'
import Editing from './Editing'
import Edits from './Edits'
import Attachments from '../../upload/Attachments'
import BoostHistory from './BoostHistory'

import ContentInfo from '../../../styled-components/problem/ContentInfo'
import ProblemBox from '../../../styled-components/problem/ProblemBox'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../../constants/misc/dateTimeOptions'

const Problem = ({ loggedIn, embeddedSolution, token }) => {
	const [showBoostHistory, change] = useState(false)
	const problem = useSelector(state => state.content.problemPage.page.problem)

	return (
		<ProblemBox>
			<ContentInfo>
				<h3>{problem.title}</h3>
				<div>
					<span>
						<b onClick={() => change(!showBoostHistory)}>{problem.bounty.toFixed(2) + ' €'}</b>
					</span>
					<span>
						{new Date(problem.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
					</span>
					{problem.submitted_by && <Link to={'/u/' + problem.submitted_by.username}>{problem.submitted_by.username}</Link>}
					{problem.active && loggedIn && <Link to={{pathname: '/problem/' + problem.id + '/boost'}}>Boost this problem</Link>}
				</div>
			</ContentInfo>
			{showBoostHistory && <BoostHistory boosts={problem.boosts} />}
			<span>Description: </span>
			<MarkdownRender source={problem.content} />
			<Attachments attachmentUrls={problem.attachmentUrls} />
			<Edits edits={problem.edits} />
			{embeddedSolution && (
				<Submission
					submissionId={embeddedSolution.id}
					page={embeddedSolution.page}
					problem={problem.id}
					isSolution={true}
				/>
			)}
			<Editing contentId={problem.id} token={token} ownerId={problem.submitted_by._id}/>
		</ProblemBox>
	)
}

export default Problem
