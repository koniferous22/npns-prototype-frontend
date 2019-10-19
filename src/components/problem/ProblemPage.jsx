import React from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';

import QueueSidebar from '../queue/QueueSidebar'
import PostSubmissionForm from './ProblemPage/PostSubmissionForm'
import Submission from './ProblemPage/Submission'

import { problemPageActions } from '../../actions/content/problemPage'

const mapStateToProps = (state, ownProps) => ({
	...state.content.problemPage.page,
	//submissionEntries: state.content.problemPage.page.submissionEntries.reduce((acc, cv) => Object.assign(acc,cv),{}),
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
		const mergedEntries = this.props.submissionEntries.reduce((acc, cv) => Object.assign(acc,cv),{})
		const submissions = Object.keys(mergedEntries).map((submissionEntry, index) => (
        		<Submission
					id={submissionEntry}
					key={index}
					problemOwner={this.props.user && this.props.user._id === this.props.problem.submitted_by}
					hasActiveReplyForm={submissionEntry === this.props.replyForm}
					loggedIn={this.props.loggedIn}
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
					this.props.loggedIn && <PostSubmissionForm token={this.props.token} problem={this.props.problem.id}/>
				}
				<InfiniteScroll
		        	pageStart={0}
		        	loadMore={() => this.props.loadSubmissionPage(this.props.paging.page + 1)}
				    hasMore={this.props.paging.hasMore}
				    loader={<div className="loader" key={0}>Loading ...</div>}
		        >
		        	{submissions}
		        </InfiniteScroll>
			</div>
		)
	}
}



export default connect(mapStateToProps, mapDispatchToProps)(ProblemPage)
