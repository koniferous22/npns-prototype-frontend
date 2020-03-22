import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import { activityPageActions } from '../../actions/content/profile/activityPage'

import { ProblemBox } from '../problem/ProblemBox'

import ProfileSidebar from './ProfileSidebar'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import ProblemBoxWrapper from '../../styled-components/problem-related/ProblemBoxWrapper'

/*const mapStateToProps = state => {
	const pageState = state.content.profile.activityPage
	return {
		...pageState,
		entries: pageState.entries.reduce((acc, cv) => acc.concat(cv),[]),
	}
}*/

const ActivityPage = ({ viewer, user, loggedIn }) => {
	const { pageState } = useSelector(state => state.content.profile.activityPage)
	const { loading, paging } = pageState
	const entries = pageState.entries.reduce((acc, cv) => acc.concat(cv),[]) 
	const dispatch = useDispatch()

  useEffect(() => {
		dispatch(activityPageActions.setUser(user))
		dispatch(activityPageActions.setActivePage(user, 1))
    return () => {
			dispatch(activityPageActions.reset())
    };
  }, [dispatch, user]);

	const base_url = '/u/' + user
	const auth_view = (user === viewer && loggedIn)

	const empty = entries.length === 0;
	if (empty) {
		return (
			<PageDiv>
				<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
				<ContentDiv sidebar>
					<CenteredDiv fullWidth>
						<h3>{loading ? "Loading" : "User " + user + " has yet no activity"}</h3>
					</CenteredDiv>
				</ContentDiv>
			</PageDiv>
		)
	}

	return (
		<PageDiv>
			<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
			<ContentDiv sidebar>
				<CenteredDiv fullWidth>
					<h3>{"Activity of user " + user}</h3>
				</CenteredDiv>
				<ProblemBoxWrapper>
					<InfiniteScroll
						pageStart={1}
						loadMore={() => {
							dispatch(activityPageActions.setActivePage(user, paging.page + 1)) 
						}}
						hasMore={paging.hasMore}
						loader={<div className="loader" key={0}>Loading ...</div>}
					>
						<ul>
						{
							entries.map((p,index) => (
								<li key={index}>
									<ProblemBox
										id={p._id}
										title={p.title}
										active={p.active}
										created={p.created}
										bounty={p.bounty}
										loggedIn={loggedIn}
										viewCount={p.view_count}
										submissionCount={p.submission_count}
										username={p.submitted_by}
									/>
								</li>
						))}
						</ul>
					</InfiniteScroll>
				</ProblemBoxWrapper>
			</ContentDiv>
		</PageDiv>
	)
}
export default ActivityPage
