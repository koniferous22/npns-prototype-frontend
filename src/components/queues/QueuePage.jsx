import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

//import { globalActions } from '../../actions/global'
import { queuePageActions } from '../../actions/content/queuePage'

import QueueSidebar from './QueueSidebar'
import ProblemAddForm from '../problems/ProblemAddForm'

const mapStateToProps = (state, ownProps) => {
	const queueState = state.content.queuePage[ownProps.queue]
	if (!queueState) {
		return {
			entries: [],
			active: 0
		}
	}
	return {
		entries: queueState.entries.reduce((acc, cv) => acc.concat(cv),[]),
		active: queueState.active,
		hasMore: queueState.hasMore
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	//setActiveQueue: queue => dispatch(globalActions.setActiveQueue(queue)),

	loadPage: page => dispatch(queuePageActions.setActivePage(ownProps.queue, page)),
	setActiveEntry: (page, entry) => dispatch(queuePageActions.setActiveEntry(page, entry))
})

class QueuePage extends React.Component {
	componentDidMount() {
		//this.props.setActiveQueue(this.props.name)
		this.props.loadPage(1)
	}
	componentDidUpdate() {
		console.log(this.props)
	}
	render() {

		return (
			<div>
	            <QueueSidebar />
	            <h3>{"Problems of queue: " + this.props.queue}</h3>
	            <InfiniteScroll
	            	pageStart={1}
	            	loadMore={() => {
	            		if (this.props.active) {
	            			this.props.loadPage(this.props.active.page + 1)	
	            		}
	            	}}
				    hasMore={this.props.hasMore}
				    loader={<div className="loader" key={0}>Loading ...</div>}
	            >
	            	<ul>
						{this.props.entries.map((p,index) => (
							<li key={index}><Link to={{pathname: "/problem/" + p._id, id: p._id}}>{p.title}</Link></li>
						))}
					</ul>	
	            </InfiniteScroll>
	            
				<p>u got a problem? post it down below</p>
	            <ProblemAddForm queue={this.props.queue}/>  
        	</div>
        );
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QueuePage)