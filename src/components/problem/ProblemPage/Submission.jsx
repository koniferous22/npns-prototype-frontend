import React from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import ReactMarkdown from 'react-markdown';

import Reply from './Reply'
import PostReplyForm from './PostReplyForm'

import { problemPageActions } from '../../../actions/content/problemPage'

import SubmissionDiv from '../../../styled-components/problem/SubmissionDiv'
import SubmissionBox from '../../../styled-components/problem/SubmissionBox'
import ContentInfo from '../../../styled-components/problem/ContentInfo'
import Button from '../../../styled-components/defaults/Button'
import LoadRepliesButton from '../../../styled-components/problem/LoadRepliesButton'

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadReplyPage: (page) => dispatch(problemPageActions.loadReplyPage(ownProps.id, page)),
	acceptSubmission: () => dispatch(problemPageActions.acceptSubmission(ownProps.id, ownProps.problem, ownProps.token)),
	selectReplyForm: () => dispatch(problemPageActions.selectReplyForm(ownProps.id))
})
// hide replies button
export const Submission = props => {
	return (
	<SubmissionDiv>
		<SubmissionBox>
			<ContentInfo>
				{new Date(props.created).toLocaleDateString()}
				{props.user && <Link to={'/u/' + props.user}>{props.user}</Link>}
			</ContentInfo>
			<ReactMarkdown source={props.content} />
			{props.acceptButton && <Button onClick={props.acceptSubmission}>Accept Submission</Button>}
			{props.replyButton && <Button onClick={props.selectReplyForm}>Reply</Button>}
		</SubmissionBox>
		{props.hasActiveReplyForm && <PostReplyForm token={props.token} submission={props.id} problem={props.problem}/>}
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
		{props.paging && props.paging.hasMore && <LoadRepliesButton onClick={() => props.loadReplyPage(props.paging.page + 1)}>Load Replies</LoadRepliesButton>}
	</SubmissionDiv>
)
}


export default connect(null, mapDispatchToProps)(Submission)
