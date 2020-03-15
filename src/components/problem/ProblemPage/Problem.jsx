import React, { useState } from 'react'
import { connect } from 'react-redux'
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

const mapStateToProps = (state, ownProps) => ({
	...state.content.problemPage.page.problem
})

const Problem = props => {
	const [showBoostHistory, change] = useState(false)
	return (
		<ProblemBox>
			<ContentInfo>
				<h3>{props.title}</h3>
				<div>
					<span>
						<b onClick={() => change(!showBoostHistory)}>{props.bounty.toFixed(2) + ' €'}</b>
					</span>
					<span>
						{new Date(props.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
					</span>
					{props.submitted_by && <Link to={'/u/' + props.submitted_by.username}>{props.submitted_by.username}</Link>}
					{props.active && props.loggedIn && <Link to={{pathname: '/problem/' + props.id + '/boost'}}>Boost this problem</Link>}
				</div>
			</ContentInfo>
			{showBoostHistory && <BoostHistory boosts={props.boosts} />}
			<span>Description: </span>
			<MarkdownRender source={props.content} />
			<Attachments attachmentUrls={props.attachmentUrls} />
			<Edits edits={props.edits} />
			{props.embeddedSolution && (
				<Submission
					submissionId={props.embeddedSolution.id}
					page={props.embeddedSolution.page}
					problem={props.id}
					isSolution={true}
				/>
			)}
			<Editing contentId={props.id} token={props.token} ownerId={props.submitted_by._id}/>
		</ProblemBox>
	)
}

export default connect(mapStateToProps)(Problem);
