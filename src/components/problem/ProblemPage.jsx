import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from "react-router-dom"

import QueueSidebar from '../queue/QueueSidebar'
import PostSubmissionForm from './ProblemPage/PostSubmissionForm'
import Submission from './ProblemPage/Submission'

import { problemPageActions } from '../../actions/content/problemPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import ContentInfo from '../../styled-components/problem/ContentInfo'
import ProblemDiv from '../../styled-components/problem/ProblemDiv'
import ProblemBox from '../../styled-components/problem/ProblemPageProblemBox'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

import { dateTimeDefaultLocale, dateTimeOptions } from '../../constants/misc/dateTimeOptions'

const mapStateToProps = (state, ownProps) => ({
	...state.content.problemPage.page,
	...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadProblemData: () => dispatch(problemPageActions.loadProblemData(ownProps.problemId)),
	loadSubmissionPage: (page) => dispatch(problemPageActions.loadSubmissionPage(ownProps.problemId, page)),
	postSubmission: (submission, token) => dispatch(problemPageActions.postSubmission(submission, token)),
	reset: () => dispatch(problemPageActions.reset())
})

class ProblemPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}

	componentDidMount() {
		this.props.loadProblemData()
	}
	render() {
		const problem = this.props.problem
		if (!problem) {
			return (
				<PageDiv>
					<QueueSidebar />
					<BackendMessage messageType={this.props.messageType}>
						{this.props.message}
					</BackendMessage>
				</PageDiv>
			)
		}

		// Honestly looked for this bug for 8 hours, when this statement was moved to mapStateToProps, new object is constructed every time, which results in cyclic updating
		// Great infinite loop :D :D 
		const problemOwner = this.props.user && problem.submitted_by && this.props.user._id === problem.submitted_by._id
		const problemActive = problem.active
		const mergedEntries = this.props.submissionEntries.reduce((acc, cv) => Object.assign(acc,cv),{})
		const submissionForm = problemActive && this.props.loggedIn && !problemOwner
		const mapSubmissionIdToComponent = (submissionEntry, index) => (
				<Submission
					id={submissionEntry}
					problem={problem.id}
					key={index}
					acceptButton={problemActive && problemOwner}
					replyButton={this.props.loggedIn}
					loadRepliesButton={true}
					hasActiveReplyForm={this.props.loggedIn && submissionEntry === this.props.replyForm}
					paging={this.props.paging[submissionEntry]}
					token={this.props.token}
					content={mergedEntries[submissionEntry].content}
					replyEntries={mergedEntries[submissionEntry].replyEntries.reduce((acc,cv) => Object.assign(acc,cv), {})}
					repliesHidden={mergedEntries[submissionEntry].repliesHidden}
					user={mergedEntries[submissionEntry].submitted_by.username}
					created={mergedEntries[submissionEntry].created}
					isSolution={problem.accepted_submission && problem.accepted_submission._id === submissionEntry}
					wrapper={true}
				/>
			)
		const submissionCount = Object.keys(mergedEntries).length
		const submissions = Object.keys(mergedEntries).map(mapSubmissionIdToComponent)
		return (
			<PageDiv>
				<QueueSidebar />
				<ContentDiv sidebar>
					<ProblemDiv>
						<ProblemBox>
							<ContentInfo>
								<h3>{problem.title}</h3>
								<div>
									<span>
										<b>{problem.bounty + '$'}</b>
									</span>
									<span>
										{new Date(problem.created).toLocaleDateString(dateTimeDefaultLocale, dateTimeOptions)}
									</span>
									{problem.submitted_by && <Link to={'/u/' + problem.submitted_by.username}>{problem.submitted_by.username}</Link>}
									{problemActive && this.props.loggedIn && <Link to={'/problem/' + problem.id + '/boost'}>Boost this problem</Link>}
								</div>
							</ContentInfo>
							<span>Description: </span>
							<ReactMarkdown source={problem.content} />
							{problem.accepted_submission && submissionCount > 1 && (
								<Submission
									id={problem.accepted_submission}
									problem={problem.id}
									content={mergedEntries[problem.accepted_submission._id].content}
									user={mergedEntries[problem.accepted_submission._id].submitted_by.username}
									created={mergedEntries[problem.accepted_submission._id].created}
									isSolution={true}
								/>
							)}
						</ProblemBox>
						{
							submissionForm && <PostSubmissionForm token={this.props.token} problem={problem.id} user={this.props.user}/>
						}
						<div style={{height:"100%",overflow:"auto"}}>
							<InfiniteScroll
								pageStart={0}
								loadMore={() => this.props.loadSubmissionPage(this.props.paging.page + 1)}
								hasMore={this.props.paging.hasMore}
								loader={<div className="loader" key={0}>Loading ...</div>}
							>
								{submissions}
							</InfiniteScroll>
						</div>
					</ProblemDiv>
				</ContentDiv>
			</PageDiv>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage)
