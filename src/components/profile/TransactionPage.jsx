import React from 'react';
import ProfileSidebar from './ProfileSidebar'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import TransactionBox from './TransactionPage/TransactionBox'
import { transactionPageActions } from '../../actions/content/profile/transactionPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import TransactionBoxWrapper from '../../styled-components/profile/TransactionBoxWrapper'

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

	componentDidMount() {
		this.props.loadPage(1)
	}

	render() {
		const empty = this.props.entries.length === 0
		if (empty) {
			return (
				<PageDiv>
					<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view/>
					<ContentDiv sidebar>
						<CenteredDiv fullWidth>
							<h3>{this.props.loading ? "Loading" : "User " + this.props.user + " has yet no transactions"}</h3>
						</CenteredDiv>
					</ContentDiv>
				</PageDiv>
			)
		}

		return (
			<PageDiv>
				<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view/>
				<ContentDiv sidebar>
					<CenteredDiv fullWidth>
						<h3>{"Transactions of user " + this.props.user}</h3>
					</CenteredDiv>
					<TransactionBoxWrapper>
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
					</TransactionBoxWrapper>
				</ContentDiv>
			</PageDiv>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionPage);
