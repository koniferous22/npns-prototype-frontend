import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import ProfileSidebar from './ProfileSidebar'
import { profilePageActions } from '../../actions/content/profile/profilePage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'
import Table from '../../styled-components/defaults/Table'

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
				<BackendMessage messageType={this.props.messageType}>
					{this.props.message}
				</BackendMessage>
			)
		}
		const userInfo = [
			{
				label: 'First Name',
				data: this.props.data.firstName
			},
			{
				label: 'Last Name',
				data: this.props.data.lastName
			},
			{
				label: 'Email',
				data: this.props.data.email
			},
			{
				label: 'Number of entered problems',
				data: this.props.data.problem_count
			},
			{
				label: 'Number of entered submissions',
				data: this.props.data.submission_count
			},
			{
				label: 'Number of entered replies',
				data: this.props.data.reply_count
			}
		]

		const balances = Object.keys(this.props.data.balances).map((q, index) => (
				<tr key={index}>
					<td><Link to={'/q/' + q}>{q}</Link></td>
					<td>{this.props.data.balances[q]}</td>
				</tr>
			))


		return (
			<PageDiv>
				<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
				<ContentDiv sidebar>
					<CenteredDiv fullWidth>
						<h3>
							User information
						</h3>
						<Table>
							<tbody>
								{
									userInfo.map((entry, index) => (
										<tr key={index}>
											<td>{entry.label}</td>
											<td>{entry.data}</td>
										</tr>
									))
								}
							</tbody>
						</Table>
						
						{balances.length > 0 &&  (
							<div>
								<h3>User score in queues</h3>
								<Table>
									<tbody>
										{balances}
									</tbody>
								</Table>
							</div>
						)}
						{'Stuff will be probably added l8r'}
					</CenteredDiv>
				</ContentDiv>
			</PageDiv>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
