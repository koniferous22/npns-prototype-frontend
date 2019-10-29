import React from 'react'
import { connect } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroller';

import { activityPageActions } from '../../actions/content/profile/activityPage'

import { ProblemBox } from '../problem/ProblemBox'

import ProfileSidebar from './ProfileSidebar'

const mapStateToProps = state => {
	const pageState = state.content.profile.activityPage
	console.log('kokotenko')
	console.log(pageState.entries)
	return {
		...pageState,
		entries: pageState.entries.reduce((acc, cv) => acc.concat(cv),[]),
	}
}
const mapDispatchToProps = (dispatch, ownProps) => ({
	setUser: (user) => dispatch(activityPageActions.setUser(user)),
	loadPage: (user, page) => dispatch(activityPageActions.setActivePage(user, page))
})

class ActivityPage extends React.Component {
	componentDidMount() {
		this.props.setUser(this.props.user)
	}

	render() {
		const base_url = '/u/' + this.props.user
		const auth_view = (this.props.user === this.props.viewer && this.props.loggedIn)

		return (<div>
			<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view={auth_view}/>
			<h3>{"Activity of user " + this.props.user}</h3>
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
						<li key={index}><ProblemBox id={p._id} title={p.title}/></li>
				))}
				</ul>
			</InfiniteScroll>
		</div>)
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(ActivityPage)