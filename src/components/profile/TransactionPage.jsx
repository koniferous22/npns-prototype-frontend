import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileSidebar from './ProfileSidebar'
import InfiniteScroll from 'react-infinite-scroller';

import TransactionBox from './TransactionPage/TransactionBox'
import { setActivePage, reset } from '../../store/content/profile/transactionPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import TransactionBoxWrapper from '../../styled-components/profile/TransactionBoxWrapper'


const TransactionPage = ({ user, token, loggedIn, viewer }) => {
	const { pageState } = useSelector(state => state.content.profile.transactionPage)
	const { loading, paging } = pageState
	const entries = pageState.entries.reduce((acc, cv) => acc.concat(cv),[]) || []
	
	const dispatch = useDispatch()
	
	useEffect(() => {
		dispatch(setActivePage(token, 1))
		return () => {
			dispatch(reset())
		};
	}, [dispatch, token]);

	const empty = entries.length === 0
	if (empty) {
		return (
			<PageDiv>
				<ProfileSidebar baseUrl={'/u/' + user} auth_view/>
				<ContentDiv sidebar>
					<CenteredDiv fullWidth>
						<h3>{loading ? "Loading" : "User " + user + " has yet no transactions"}</h3>
					</CenteredDiv>
				</ContentDiv>
			</PageDiv>
		)
	}

	return (
		<PageDiv>
			<ProfileSidebar baseUrl={'/u/' + user} auth_view/>
			<ContentDiv sidebar>
				<CenteredDiv fullWidth>
					<h3>{"Transactions of user " + user}</h3>
				</CenteredDiv>
				<TransactionBoxWrapper>
					<InfiniteScroll
						pageStart={1}
						loadMore={() => {
							dispatch(setActivePage(token, paging.page + 1))
						}}
						hasMore={paging.hasMore}
						loader={<div className="loader" key={0}>Loading ...</div>}
					>
						<ul>
						{
							entries.map(
								(p,index) => <li key={index}><TransactionBox {...p}/></li>
							)
						}
						</ul>
					</InfiniteScroll>
				</TransactionBoxWrapper>
			</ContentDiv>
		</PageDiv>
	)
}

export default TransactionPage
