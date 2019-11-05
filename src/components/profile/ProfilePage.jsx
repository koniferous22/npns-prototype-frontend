import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ProfileSidebar from './ProfileSidebar'
import { profilePageActions } from '../../actions/content/profile/profilePage'

import ContentDiv from '../../styled-components/defaults/StyledContentDiv'

const mapStateToProps = state => state.content.profile.profilePage;
const mapDispatchToProps = dispatch => ({
	loadUserData: (username) => dispatch(profilePageActions.loadUserData(username))
})

class ProfilePage extends React.Component {
	componentDidMount() {
		this.props.loadUserData(this.props.user)
	}
	render() {
		const base_url = '/u/' + this.props.user
		const auth_view = (this.props.user === this.props.viewer && this.props.loggedIn)
		if (this.props.message) {
			return (
				<p>
					{this.props.message}
				</p>
			)
		}
		const balances = Object.keys(this.props.data.balances).map((q, index) => (
				<li key={index}>
					<Link to={'/q/' + q}>{q}</Link>
					{': ' + this.props.data.balances[q]}
				</li>
			))


		return (
			<div>
				<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
				<ContentDiv sidebar>
					<p>
						{'First Name: ' + this.props.data.firstName}<br />
						{'Last Name: ' + this.props.data.lastName}<br />
						{'Email: ' + this.props.data.email}<br />
						{'Number of entered problems: ' + this.props.data.problem_count}<br />
						{'Number of entered submissions: ' + this.props.data.submission_count}<br />
						{'Number of entered replies: ' + this.props.data.reply_count}<br />
						
					</p>
					{balances.length > 0 &&  (
						<div>
							{'User score in queues'}
							<ul>
								{balances}
							</ul>
						</div>
					)}
					{'Stuff will be probably added l8r'}
				</ContentDiv>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
