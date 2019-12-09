import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import MarkdownRender from '../../form/MarkdownRender'

import Reply from './Reply'
import PostReplyForm from './PostReplyForm'

import { problemPageActions } from '../../../actions/content/problemPage'

import SubmissionDiv from '../../../styled-components/problem/SubmissionDiv'
import SubmissionBox from '../../../styled-components/problem/SubmissionBox'
import ContentInfo from '../../../styled-components/problem/ContentInfo'
import Button from '../../../styled-components/defaults/Button'
import ButtonDiv from '../../../styled-components/defaults/ButtonDiv'
import RepliesButton from '../../../styled-components/problem/RepliesButton'
import RepliesButtonDiv from '../../../styled-components/problem/RepliesButtonDiv'
import SolutionLabel from '../../../styled-components/problem/SolutionLabel'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../../constants/misc/dateTimeOptions'

const mapStateToProps = (state, ownProps) => {
	const submissionState = state.content.problemPage.page.submissionEntries[ownProps.page || 0][ownProps.submissionId]
	return {
		content: submissionState.content,
		replyEntries: submissionState.replyEntries.reduce((acc,cv) => Object.assign(acc,cv), {}),
		repliesHidden: submissionState.repliesHidden,
		user: submissionState.submitted_by.username,
		created: submissionState.created
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadReplyPage: (page) => dispatch(problemPageActions.loadReplyPage(ownProps.submissionId, page)),
	hideReplies: () => dispatch(problemPageActions.hideReplies(ownProps.submissionId)),
	acceptSubmission: () => dispatch(problemPageActions.acceptSubmission(ownProps.submissionId, ownProps.problem, ownProps.token)),
	selectReplyForm: () => dispatch(problemPageActions.selectReplyForm(ownProps.submissionId))
})

const Submission = props => {
	const submissionBox = (
		<SubmissionBox solution={props.isSolution}>
			<ContentInfo>
				{props.isSolution && <SolutionLabel>SOLUTION</SolutionLabel>}
				{new Date(props.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
				{props.user && <Link to={'/u/' + props.user}>{props.user}</Link>}
			</ContentInfo>
			<MarkdownRender source={props.content} />
			<ButtonDiv>
				{props.acceptButton && <Button onClick={props.acceptSubmission}>Accept Submission</Button>}
				{props.replyButton && <Button onClick={props.selectReplyForm}>Reply</Button>}
			</ButtonDiv>
		</SubmissionBox>
	)
	if (!props.wrapper) {
		return submissionBox
	}
	return (
		<SubmissionDiv>
			{submissionBox}
			{props.hasActiveReplyForm && <PostReplyForm token={props.token} submission={props.submissionId} problem={props.problem}/>}
			{props.repliesHidden === false && (
				<ul>
					{
						Object.keys(props.replyEntries).map((e, index) => (
							<li key={index}>
								<Reply 
									content={props.replyEntries[e].content}
									created={props.replyEntries[e].created}
									user={props.replyEntries[e].submitted_by.username}
								/>
							</li>))
					}
				</ul>
			)}
			{
				props.loadRepliesButton && 
				(
					<RepliesButtonDiv>
						{props.paging && props.paging.hasMore && <RepliesButton onClick={() => props.loadReplyPage(props.paging.page + 1)}>{'Load ' + (!props.repliesHidden ? 'More ' : '') + 'Replies'}</RepliesButton>}
						{!props.repliesHidden && <RepliesButton onClick={() => props.hideReplies()}>Hide Replies</RepliesButton>}
					</RepliesButtonDiv>
				)
			}
		</SubmissionDiv>
	)
}


export default connect(mapStateToProps, mapDispatchToProps)(Submission)
