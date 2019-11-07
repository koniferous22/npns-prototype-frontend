import React from 'react';
//
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from "react-router-dom"

import { queuePageActions } from '../../actions/content/queuePage'

import QueueSidebar from './QueueSidebar'
import { ProblemBox } from '../problem/ProblemBox'

import ContentDiv from '../../styled-components/defaults/ContentDiv'

const mapStateToProps = (state, ownProps) => {
	const queue = ownProps.queue
	const queueState = state.content.queuePage[queue]
	if (!queueState) {
		return {
			entries: [],
			paging: {
				page: 0,
				hasMore: true
			},
			queue: queue
		}
	}
	return {
		entries: queueState.entries.reduce((acc, cv) => acc.concat(cv),[]),
		paging: queueState.paging,
		queue: queue
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadPage: page => dispatch(queuePageActions.setActivePage(ownProps.queue, page)),
	setActiveEntry: (page, entry) => dispatch(queuePageActions.setActiveEntry(page, entry)),
	reset: () => dispatch(queuePageActions.reset(ownProps.queue))
})

class QueuePage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}

	componentDidUpdate(prevProps){
		if (prevProps.queue !== this.props.queue) {
			this.props.loadPage(1)
		}
	}

	componentDidMount() {
		this.props.loadPage(1)
	}

	render() {
		const submitProblem = (
			<div>
				{'Submit problem '}
				<Link to={'/submitProblem?q=' + this.props.queue}>here</Link>
			</div>
		)
		/*
			no need to test if queue doesnt exist, backend returns only empty array
		*/
		return (
			<div>
				<QueueSidebar />
				<ContentDiv sidebar>
					{this.props.loggedIn && submitProblem}
					<h3>{"Problems of queue: " + this.props.queue}</h3>
					<InfiniteScroll
						pageStart={1}
						loadMore={() => {
							this.props.loadPage(this.props.paging.page + 1) 
						}}
						hasMore={this.props.paging.hasMore}
						loader={<div className="loader" key={0}>Loading ...</div>}
					>
						<ul>
						{
							this.props.entries.map((p,index) => (
								<li key={index}><ProblemBox id={p._id} title={p.title}/></li>
						))}
						</ul>
					</InfiniteScroll>
				</ContentDiv>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePage)
