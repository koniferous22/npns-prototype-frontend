import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import MarkdownRender from '../../form/MarkdownRender'

import Submission from './Submission'

import ContentInfo from '../../../styled-components/problem/ContentInfo'
import ProblemBox from '../../../styled-components/problem/ProblemBox'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../../constants/misc/dateTimeOptions'

const mapStateToProps = (state, ownProps) => ({
	...state.content.problemPage.page.problem,
})

const Problem = props => {
	return (
		<ProblemBox>
			<ContentInfo>
				<h3>{props.title}</h3>
				<div>
					<span>
						<b>{props.bounty + '$'}</b>
					</span>
					<span>
						{new Date(props.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
					</span>
					{props.submitted_by && <Link to={'/u/' + props.submitted_by.username}>{props.submitted_by.username}</Link>}
					{props.active && props.loggedIn && <Link to={'/problem/' + props.id + '/boost'}>Boost this problem</Link>}
				</div>
			</ContentInfo>
			<span>Description: </span>
			<MarkdownRender source={props.content} />
			{props.attachmentUrl && <img src={props.attachmentUrl} alt="attachment" />}
			{props.embeddedSolution && (
				<Submission
					submissionId={props.embeddedSolution.id}
					page={props.embeddedSolution.page}
					problem={props.id}
					isSolution={true}
				/>
			)}
		</ProblemBox>
	)
}

export default connect(mapStateToProps)(Problem);
