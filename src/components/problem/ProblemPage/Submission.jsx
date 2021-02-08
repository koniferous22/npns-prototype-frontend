import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import MarkdownRender from '../../form/MarkdownRender'

import Reply from './Reply'
import PostReplyForm from './PostReplyForm'
import Attachments from '../../upload/Attachments'
import Editing from './Editing'
import Edits from './Edits'

import {
	acceptSubmission,
	selectReplyForm,
	loadReplyPage,
	hideReplies
} from '../../../store/content/problemPage'

import SubmissionDiv from '../../../styled-components/problem/SubmissionDiv'
import SubmissionBox from '../../../styled-components/problem/SubmissionBox'
import ContentInfo from '../../../styled-components/problem/ContentInfo'
import Button from '../../../styled-components/defaults/Button'
import ButtonDiv from '../../../styled-components/defaults/ButtonDiv'
import RepliesButton from '../../../styled-components/problem/RepliesButton'
import RepliesButtonDiv from '../../../styled-components/problem/RepliesButtonDiv'
import SolutionLabel from '../../../styled-components/problem/SolutionLabel'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../../utils'

const Submission = ({ submissionId, page, problem, acceptButton, replyButton, loadRepliesButton, hasActiveReplyForm, paging, token, isSolution, wrapper }) => {

	const { content, replyEntries, repliesHidden, user, userId, created, attachmentUrls, edits } = useSelector(state => state.content.problemPage.page.submissionEntries[page || 0][submissionId])

	const dispatch = useDispatch()
	const redReplyEntries = replyEntries.reduce((acc,cv) => Object.assign(acc,cv), {})
	const submissionBox = (
		<SubmissionBox solution={isSolution}>
			<ContentInfo>
				{isSolution && <SolutionLabel>SOLUTION</SolutionLabel>}
				{new Date(created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
				{user && <Link to={'/u/' + user}>{user}</Link>}
			</ContentInfo>
			<MarkdownRender source={content} />
			<Attachments attachmentUrls={attachmentUrls} />
      <Edits edits={edits} />
			<ButtonDiv>
				{acceptButton && <Button onClick={() => dispatch(acceptSubmission(submissionId, problem, token))}>Accept Submission</Button>}
				{replyButton && <Button onClick={() => dispatch(selectReplyForm(submissionId))}>Reply</Button>}
				<Editing contentId={submissionId} token={token} ownerId={userId}/>
			</ButtonDiv>
		</SubmissionBox>
	)
	if (!wrapper) {
		return submissionBox
	}
	return (
		<SubmissionDiv>
			{submissionBox}
			{hasActiveReplyForm && <PostReplyForm token={token} submission={submissionId} problem={problem}/>}
			{repliesHidden === false && (
				<ul>
					{
						Object.keys(redReplyEntries).map((e, index) => (
							<li key={index}>
								<Reply 
									content={redReplyEntries[e].content}
									created={redReplyEntries[e].created}
									user={redReplyEntries[e].submitted_by.username}
								/>
							</li>))
					}
				</ul>
			)}
			{
				loadRepliesButton && 
				(
					<RepliesButtonDiv>
						{paging && paging.hasMore && <RepliesButton onClick={() => dispatch(loadReplyPage(submissionId, paging.page + 1))}>{'Load ' + (!repliesHidden ? 'More ' : '') + 'Replies'}</RepliesButton>}
						{!repliesHidden && <RepliesButton onClick={() => dispatch(hideReplies(submissionId))}>Hide Replies</RepliesButton>}
					</RepliesButtonDiv>
				)
			}
		</SubmissionDiv>
	)
}

export default Submission
