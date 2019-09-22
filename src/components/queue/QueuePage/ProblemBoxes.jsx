import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller';

import { queuePageActions } from '../../../actions/content/queuePage'

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadPage: page => dispatch(queuePageActions.setActivePage(ownProps.queue, page)),
	setActiveEntry: (page, entry) => dispatch(queuePageActions.setActiveEntry(page, entry))
})

class ProblemBoxes extends React.Component {
	render() {
		return (
			<InfiniteScroll pageStart={1}
	        	loadMore={() => {
	        		this.props.loadPage(this.props.active.page + 1)	
	        	}}
			    hasMore={this.props.hasMore}
			    loader={<div className="loader" key={0}>Loading ...</div>}
			>	
				
			</InfiniteScroll>
		)
	}
}  

export default connect(null, mapDispatchToProps)(ProblemBoxes)