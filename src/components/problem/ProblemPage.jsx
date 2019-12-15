import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import QueueSidebar from '../queue/QueueSidebar'
import Problem from './ProblemPage/Problem'
import Submission from './ProblemPage/Submission'
import PostSubmission from './ProblemPage/PostSubmission'

import { problemPageActions } from '../../actions/content/problemPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import ProblemDiv from '../../styled-components/problem/ProblemDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const mapStateToProps = (state, ownProps) => {
	const problemPageState = state.content.problemPage.page
	const problem = problemPageState.problem
	return {
		// writted explicitly, so that submission entries is ommited
		problemActive: problem ? problem.active : null,
		problemOwner: ownProps.user && problem.submitted_by && ownProps.user._id === problem.submitted_by._id,
		problemSolution: (problem && problem.accepted_submission) ? problem.accepted_submission._id : null,

		paging: problemPageState.paging,
		reply: problemPageState.reply,
		submissionFormSubmitted: problemPageState.submissionFormSubmitted,
		submissionEntries: problemPageState.submissionEntries,
		...ownProps
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadProblemData: () => dispatch(problemPageActions.loadProblemData(ownProps.problemId)),
	loadSubmissionPage: (page) => dispatch(problemPageActions.loadSubmissionPage(ownProps.problemId, page)),
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
		if (this.props.problemActive === null) {
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
		const submissionIdentifiers = this.props.submissionEntries.reduce((acc, cv, index) => acc.concat(Object.keys(cv).map(submissionId => ({id: submissionId, page: index}))), [])
		//const mergedEntries = this.props.submissionEntries.reduce((acc, cv) => Object.assign(acc,cv),{})
		const postSubmissionAvailable = this.props.problemActive && this.props.loggedIn && !this.props.problemOwner && !this.props.submissionFormSubmitted
		const mapSubmissionIdToComponent = (submissionEntry, index) => (
				<Submission
					submissionId={submissionEntry.id}
					page={submissionEntry.page}
					problem={this.props.problemId}
					key={index}
					acceptButton={this.props.problemActive && this.props.problemOwner}
					replyButton={this.props.loggedIn}
					loadRepliesButton={true}
					hasActiveReplyForm={this.props.loggedIn && submissionEntry.id === this.props.reply}
					paging={this.props.paging[submissionEntry.id]}
					token={this.props.token}
					isSolution={this.props.problemSolution === submissionEntry.id}
					wrapper={true}
				/>
			)
		const submissionCount = submissionIdentifiers.length
		const submissions = submissionIdentifiers.map(mapSubmissionIdToComponent)
		const embeddedSolution = (this.props.problemSolution && submissionCount > 1) ? (submissionIdentifiers.find(x => x.id === this.props.problemSolution) || null) : null
		return (
			<PageDiv>
				<QueueSidebar />
				<ContentDiv sidebar>
					<ProblemDiv>
						<Problem 
							problemId={this.props.problemId}
							loggedIn={this.props.loggedIn}
							embeddedSolution={embeddedSolution}
						/>
						{postSubmissionAvailable &&  <PostSubmission token={this.props.token} problemId={this.props.problemId} />}
						
						<div>
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
