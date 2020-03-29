import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import QueueSidebar from '../queue/QueueSidebar'
import Problem from './ProblemPage/Problem'
import Submission from './ProblemPage/Submission'
import PostSubmission from './ProblemPage/PostSubmission'

import { loadProblemData, loadSubmissionPage, reset } from '../../store/content/problemPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import ProblemDiv from '../../styled-components/problem/ProblemDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'

const getProblemPageState = user => state => {
	const problemPageState = state.content.problemPage.page
	const problem = problemPageState.problem
	return {
		// writted explicitly, so that submission entries is ommited
		problemActive: problem ? problem.active : null,
		problemOwner: user && problem.submitted_by && user._id === problem.submitted_by._id,
		problemSolution: (problem && problem.accepted_submission) ? problem.accepted_submission._id : null,

		paging: problemPageState.paging,
		reply: problemPageState.reply,
		submissionFormSubmitted: problemPageState.submissionFormSubmitted,
		message: problemPageState.message,
		messageType: problemPageState.messageType
	}
}

const getSubmissionIdentifiers = (state) => {
	const submissionEntries = state.content.probelmPage.page.submissionEntries;
	submissionEntries.reduce((acc, cv, index) => acc.concat(Object.keys(cv).map(submissionId => ({id: submissionId, page: index}))), [])
}

const ProblemPage = ({
	loggedIn,
	token,
	problemId,
	user
}) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadProblemData())
		return () => {
			dispatch(reset())
		}
	}, [dispatch])
	const {
		problemActive,
		problemOwner,
		problemSolution,
		paging,
		reply,
		submissionFormSubmitted,
	} = useSelector(getProblemPageState(user))

	const submissionIdentifiers = useSelector(getSubmissionIdentifiers)
	const postSubmissionAvailable = problemActive && loggedIn && !problemOwner && !submissionFormSubmitted
	if (problemActive === null) {	
		return (
			<PageDiv>
				<QueueSidebar />
				<BackendMessage messageType={this.props.messageType}>
					{this.props.message}
				</BackendMessage>
			</PageDiv>
		)
	}
	const mapSubmissionIdToComponent = (submissionEntry, index) => (
			<Submission
				submissionId={submissionEntry.id}
				page={submissionEntry.page}
				problem={problemId}
				key={index}
				acceptButton={problemActive && problemOwner}
				replyButton={loggedIn}
				loadRepliesButton={true}
				hasActiveReplyForm={loggedIn && submissionEntry.id === reply}
				paging={paging[submissionEntry.id]}
				token={token}
				isSolution={problemSolution === submissionEntry.id}
				wrapper={true}
			/>
		)
	const submissionCount = submissionIdentifiers.length
	const submissions = submissionIdentifiers.map(mapSubmissionIdToComponent)
	const embeddedSolution = (problemSolution && submissionCount > 1) ? (submissionIdentifiers.find(x => x.id === problemSolution) || null) : null
	return (
		<PageDiv>
			<QueueSidebar />
			<ContentDiv sidebar>
				<ProblemDiv>
					<Problem 
						problemId={problemId}
						loggedIn={loggedIn}
						embeddedSolution={embeddedSolution}
						token = {token}
					/>
					{postSubmissionAvailable &&  <PostSubmission token={token} problemId={problemId} />}
					
					<div>
						<InfiniteScroll
							pageStart={0}
							loadMore={() => loadSubmissionPage(paging.page + 1)}
							hasMore={paging.hasMore}
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

export default ProblemPage
