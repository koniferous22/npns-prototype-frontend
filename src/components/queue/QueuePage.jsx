import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import { queuePageActions } from '../../actions/content/queuePage'

import QueueSidebar from './QueueSidebar'
//import ProblemAddForm from '../problem/ProblemAddForm'
//import ProblemBoxes from './QueuePage/ProblemBoxes'

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
	setActiveEntry: (page, entry) => dispatch(queuePageActions.setActiveEntry(page, entry))
})

class QueuePage extends React.Component {
	render() {
		return (
			<div>
	            <QueueSidebar />

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
							<li key={index}><Link to={{pathname: "/problem/" + p._id, id: p._id}}>{p.title}</Link></li>
					))}
					</ul>
	            </InfiniteScroll>
				
        	</div>
        );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePage)