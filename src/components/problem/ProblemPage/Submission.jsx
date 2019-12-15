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
		replyEntries: submissionState.replyEntries,
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

class Submission extends React.Component {

	render() {
		const replyEntries = this.props.replyEntries.reduce((acc,cv) => Object.assign(acc,cv), {})
		const submissionBox = (
			<SubmissionBox solution={this.props.isSolution}>
				<ContentInfo>
					{this.props.isSolution && <SolutionLabel>SOLUTION</SolutionLabel>}
					{new Date(this.props.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
					{this.props.user && <Link to={'/u/' + this.props.user}>{this.props.user}</Link>}
				</ContentInfo>
				<MarkdownRender source={this.props.content} />
				<ButtonDiv>
					{this.props.acceptButton && <Button onClick={this.props.acceptSubmission}>Accept Submission</Button>}
					{this.props.replyButton && <Button onClick={this.props.selectReplyForm}>Reply</Button>}
				</ButtonDiv>
			</SubmissionBox>
		)
		if (!this.props.wrapper) {
			return submissionBox
		}
		return (
			<SubmissionDiv>
				{submissionBox}
				{this.props.hasActiveReplyForm && <PostReplyForm token={this.props.token} submission={this.props.submissionId} problem={this.props.problem}/>}
				{this.props.repliesHidden === false && (
					<ul>
						{
							Object.keys(replyEntries).map((e, index) => (
								<li key={index}>
									<Reply 
										content={replyEntries[e].content}
										created={replyEntries[e].created}
										user={replyEntries[e].submitted_by.username}
									/>
								</li>))
						}
					</ul>
				)}
				{
					this.props.loadRepliesButton && 
					(
						<RepliesButtonDiv>
							{this.props.paging && this.props.paging.hasMore && <RepliesButton onClick={() => this.props.loadReplyPage(this.props.paging.page + 1)}>{'Load ' + (!this.props.repliesHidden ? 'More ' : '') + 'Replies'}</RepliesButton>}
							{!this.props.repliesHidden && <RepliesButton onClick={() => this.props.hideReplies()}>Hide Replies</RepliesButton>}
						</RepliesButtonDiv>
					)
				}
			</SubmissionDiv>
		)
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(Submission)
