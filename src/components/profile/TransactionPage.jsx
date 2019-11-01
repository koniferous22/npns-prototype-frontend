import React from 'react';
import ProfileSidebar from './ProfileSidebar'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import TransactionBox from './TransactionPage/TransactionBox'
import { transactionPageActions } from '../../actions/content/profile/transactionPage'

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadPage: (page) => dispatch(transactionPageActions.setActivePage(ownProps.token, page)),
	reset: () => dispatch(transactionPageActions.reset())
})

const mapStateToProps = (state, ownProps) => {
	const pageState = state.content.profile.transactionPage
	return {
		...pageState,
		entries: pageState.entries.reduce((acc, cv) => acc.concat(cv),[]) || [],
		...ownProps
	}
}

class TransactionPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		return (
			<div>
				<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view/>

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
							<li key={index}><TransactionBox {...p}/></li>
					))}
					</ul>
				</InfiniteScroll>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
