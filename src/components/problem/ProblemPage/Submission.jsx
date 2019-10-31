import React from 'react'
import { connect } from 'react-redux'

import Reply from './Reply'
import PostReplyForm from './PostReplyForm'

import { problemPageActions } from '../../../actions/content/problemPage'

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadReplyPage: (page) => dispatch(problemPageActions.loadReplyPage(ownProps.id, page)),
	acceptSubmission: () => dispatch(problemPageActions.acceptSubmission(ownProps.id, ownProps.problem, ownProps.token)),
	selectReplyForm: () => dispatch(problemPageActions.selectReplyForm(ownProps.id))
})
// hide replies button
export const Submission = props => {
	return (
	<div>
		<p>
			{props.content}
		</p>
		{props.acceptButton && <button onClick={props.acceptSubmission}>Accept Submission</button>}
		{props.replyButton && <button onClick={props.selectReplyForm}>Reply</button>}
		{props.hasActiveReplyForm && <PostReplyForm token={props.token} submission={props.id} problem={props.problem}/>}
		<ul>
			{
				Object.keys(props.replyEntries).map((e, index) => (<li key={index}><Reply content={props.replyEntries[e].content} /></li>))
			}
		</ul>
		{props.paging && props.paging.hasMore && <button onClick={() => props.loadReplyPage(props.paging.page + 1)}>Load Replies</button>}
	</div>
)
}


export default connect(null, mapDispatchToProps)(Submission)
