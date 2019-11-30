import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import { activityPageActions } from '../../actions/content/profile/activityPage'

import { ProblemBox } from '../problem/ProblemBox'

import ProfileSidebar from './ProfileSidebar'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import ProblemBoxWrapper from '../../styled-components/problem-related/ProblemBoxWrapper'

const mapStateToProps = state => {
	const pageState = state.content.profile.activityPage
	return {
		...pageState,
		entries: pageState.entries.reduce((acc, cv) => acc.concat(cv),[]),
	}
}
const mapDispatchToProps = (dispatch, ownProps) => ({
	setUser: (user) => dispatch(activityPageActions.setUser(user)),
	loadPage: (user, page) => dispatch(activityPageActions.setActivePage(user, page)),
	reset: () => dispatch(activityPageActions.reset())
})

class ActivityPage extends React.Component {
	componentDidMount() {
		this.props.setUser(this.props.user)
		this.props.loadPage(this.props.user, 1)
	}

	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		const base_url = '/u/' + this.props.user
		const auth_view = (this.props.user === this.props.viewer && this.props.loggedIn)

		const empty = this.props.entries.length === 0;
		if (empty) {
			return (
				<PageDiv>
					<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
					<ContentDiv sidebar>
						<CenteredDiv fullWidth>
							<h3>{this.props.loading ? "Loading" : "User " + this.props.user + " has yet no activity"}</h3>
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
						<h3>{"Activity of user " + this.props.user}</h3>
					</CenteredDiv>
					<ProblemBoxWrapper>
						<InfiniteScroll
							pageStart={1}
							loadMore={() => {
								this.props.loadPage(this.props.user, this.props.paging.page + 1) 
							}}
							hasMore={this.props.paging.hasMore}
							loader={<div className="loader" key={0}>Loading ...</div>}
						>
							<ul>
							{
								this.props.entries.map((p,index) => (
									<li key={index}>
										<ProblemBox
											id={p._id}
											title={p.title}
											active={p.active}
											created={p.created}
											bounty={p.bounty}
											loggedIn={this.props.loggedIn}
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
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage)