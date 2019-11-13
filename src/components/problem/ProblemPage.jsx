import React from 'react';
import ReactMarkdown from 'react-markdown';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from "react-router-dom"

import QueueSidebar from '../queue/QueueSidebar'
import PostSubmissionForm from './ProblemPage/PostSubmissionForm'
import Submission from './ProblemPage/Submission'

import { problemPageActions } from '../../actions/content/problemPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'

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
				<div>
					<QueueSidebar />
					{this.props.message}
				</div>
			)
		}

		// Honestly looked for this bug for 8 hours, when this statement was moved to mapStateToProps, new object is constructed every time, which results in cyclic updating
		// Great infinite loop :D :D 
		const problemOwner = this.props.user && this.props.user._id === problem.submitted_by
		const problemActive = problem.active
		const mergedEntries = this.props.submissionEntries.reduce((acc, cv) => Object.assign(acc,cv),{})
		const submissionForm = problemActive && this.props.loggedIn && !problemOwner
		const submissions = Object.keys(mergedEntries).map((submissionEntry, index) => (
				<Submission
					id={submissionEntry}
					problem={problem.id}
					key={index}
					acceptButton={problemActive && problemOwner}
					replyButton={this.props.loggedIn}
					hasActiveReplyForm={this.props.loggedIn && submissionEntry === this.props.replyForm}
					paging={this.props.paging[submissionEntry]}
					token={this.props.token}
					content={mergedEntries[submissionEntry].content}
					replyEntries={mergedEntries[submissionEntry].replyEntries.reduce((acc,cv) => Object.assign(acc,cv), {})}
				/>
			))
		return (
			<div>
				<QueueSidebar />
				<ContentDiv sidebar>
					<h3>{problem.title}</h3>
					<p>
						<ReactMarkdown source={problem.content} />
					</p>
					<p>
						{!problem.accepted_submission && this.props.loggedIn && <Link to={'/problem/' + problem.id + '/boost'}>Boost this problem</Link>}
					</p>
					{
						submissionForm && <PostSubmissionForm token={this.props.token} problem={problem.id}/>
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
				</ContentDiv>
			</div>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage)
