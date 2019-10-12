import React from 'react';
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'
import { profilePageActions } from '../../actions/content/profile/profilePage'

const mapStateToProps = state => state.content.profile.profilePage;
const mapDispatchToProps = dispatch => ({
	loadUserData: (username) => dispatch(profilePageActions.loadUserData(username))
})

class ProfilePage extends React.Component {
	componentDidMount() {
		this.props.loadUserData(this.props.user)
	}
	render() {
		console.log(this.props)
		const base_url = '/u/' + this.props.user
		const auth_view = (this.props.user === this.props.viewer && this.props.loggedIn)

		return this.props.message ? (
				<p>
					{this.props.message}
				</p>
			) :(
				<div>
					<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
					<p>
						{'First Name: ' + this.props.data.firstName}<br />
						{'Last Name: ' + this.props.data.lastName}<br />
						{'Email: ' + this.props.data.email}<br />
						{'Number of entered problems: ' + this.props.data.problem_count}<br />
						{'Number of entered submissions: ' + this.props.data.submission_count}<br />
						{'Number of entered replies: ' + this.props.data.reply_count}<br />
						{'Stuff will be probably added l8r'}
					</p>
				</div>
			);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
