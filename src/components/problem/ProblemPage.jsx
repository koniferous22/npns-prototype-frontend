	import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import QueueSidebar from '../queue/QueueSidebar'
import PostSubmissionForm from './ProblemPage/PostSubmissionForm'
import Submission from './ProblemPage/Submission'

import { problemPageActions } from '../../actions/content/problemPage'

const mapStateToProps = (state, ownProps) => ({
	...state.content.problemPage.page,
	...ownProps
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadProblemData: () => dispatch(problemPageActions.loadProblemData(ownProps.problemId)),
	loadSubmissionPage: (page) => dispatch(problemPageActions.loadSubmissionPage(ownProps.problemId, page)),
	postSubmission: (submission, token) => dispatch(problemPageActions.postSubmission(submission, token)),
})

class ProblemPage extends React.Component {
	
	componentDidMount() {
		this.props.loadProblemData()
	}

	render() {
		if (!this.props.problem) {
			return (
				<div>
					<QueueSidebar />
					{this.props.message}
				</div>
			)
		}

		// Honestly looked for this bug for 8 hours, when this statement was moved to mapStateToProps, new object is constructed every time, which results in cyclic updating
		// Great infinite loop :D :D 
		const problemOwner = this.props.user && this.props.user._id === this.props.problem.submitted_by
		const problemActive = this.props.problem.active
		const mergedEntries = this.props.submissionEntries.reduce((acc, cv) => Object.assign(acc,cv),{})
		const submissionForm = problemActive && this.props.loggedIn && !problemOwner
		const submissions = Object.keys(mergedEntries).map((submissionEntry, index) => (
				<Submission
					id={submissionEntry}
					problem={this.props.problem.id}
					key={index}
					acceptButton={problemActive && problemOwner}
					replyButton={this.props.loggedIn}
					hasActiveReplyForm={problemActive && submissionEntry === this.props.replyForm}
					paging={this.props.paging[submissionEntry]}
					token={this.props.token}
					content={mergedEntries[submissionEntry].content}
					replyEntries={mergedEntries[submissionEntry].replyEntries.reduce((acc,cv) => Object.assign(acc,cv), {})}
				/>
			))
		return (
			<div>
				<QueueSidebar />
				<h3>{this.props.problem.title}</h3>
				<p>
					{this.props.problem.content}
				</p>
				{
					submissionForm && <PostSubmissionForm token={this.props.token} problem={this.props.problem.id}/>
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
			</div>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage)
