import React, { useEffect, useCallback } from 'react';
//
import { useSelector, useDispatch } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';
import { Link } from "react-router-dom"

import { setActivePage, reset } from '../../store/content/queuePage'

import QueueSidebar from './QueueSidebar'
import { ProblemBox } from '../problem/ProblemBox'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import ProblemBoxWrapper from '../../styled-components/problem-related/ProblemBoxWrapper'

const QueuePage = ({ queue, loggedIn }) => {
	const dispatch = useDispatch()
	const loadPage = useCallback(page => dispatch(setActivePage(queue, page)), [queue, dispatch])
	const resetPage = useCallback(() => dispatch(reset(queue)), [queue, dispatch])
	useEffect(() => {
		loadPage(1)
		return () => {
			resetPage()
		}
	}, [queue, loadPage, resetPage])
	const queueExists = useSelector((state) => state.global.linQueues.includes(queue))
	const queueInRedux = useSelector(state => state.content.queuePage[queue])
	const queueState = (queueInRedux ? {
			entries: (queueInRedux.entries || []).reduce((acc, cv) => acc.concat(cv),[]),
			paging: queueInRedux.paging,
			queue: queue,
			loading: queueInRedux.loading,
			queueExists
		} : {
			entries: [],
			paging: {
				page: 0,
				hasMore: true
			},
			queue: queue,
			queueExists
		} 
	)
	const submitProblem = (
		<div>
			{'Submit problem '}
			<Link to={'/submitProblem?q=' + queue}>here</Link>
		</div>
	)
	const empty = queueState.entries.length === 0
	if (empty) {
		return (
			<PageDiv>
				<QueueSidebar />
				<ContentDiv sidebar>
					<CenteredDiv fullWidth>
						<h3>
							{queueState.loading ? "Loading" : " There's nothing here"}
						</h3>
						{queueExists && submitProblem}
					</CenteredDiv>
				</ContentDiv>
			</PageDiv>
		)
	}
	return (
		<PageDiv>
			<QueueSidebar />
			<ContentDiv sidebar>
				<CenteredDiv fullWidth>
					<h3>{"Problems of queue: " + queue}</h3>
					{loggedIn && submitProblem}
				</CenteredDiv>
				<ProblemBoxWrapper>
					<InfiniteScroll
						pageStart={1}
						loadMore={() => {
							loadPage(queueState.paging.page + 1) 
						}}
						hasMore={queueState.paging.hasMore}
						loader={<div className="loader" key={0}>Loading ...</div>}
					>
						<ul>
						{
							queueState.entries.map((p,index) => (
								<li key={index}>
									<ProblemBox 
										id={p._id}
										title={p.title}
										active={p.active}
										created={p.created}
										bounty={p.bounty}
										boost_value={p.boost_value}
										loggedIn={loggedIn}
										viewCount={p.view_count}
										submissionCount={p.submissions.length}
										username={p.username}
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

export default QueuePage
