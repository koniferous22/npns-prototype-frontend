import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ProfileSidebar from './ProfileSidebar'
import { loadUserData } from '../../store/content/profile/profilePage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'
import Table from '../../styled-components/defaults/Table'

const getUserInfo = ({
	firstName,
	lastName,
	email,
	problem_count,
	submission_count,
	reply_count
}) => {
	return [
		{
			label: 'First Name',
			data: firstName
		},
		{
			label: 'Last Name',
			data: lastName
		},
		{
			label: 'Email',
			data: email
		},
		{
			label: 'Number of entered problems',
			data: problem_count
		},
		{
			label: 'Number of entered submissions',
			data: submission_count
		},
		{
			label: 'Number of entered replies',
			data: reply_count
		}
	]
}

const ProfilePage = ({ viewer, user, loggedIn }) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(loadUserData(user))
	}, [dispatch, user]);
	const { message, messageType, data } = useSelector(state => state.content.profile.profilePage)

	const base_url = '/u/' + user
	const auth_view = (user === viewer && loggedIn)
	if (message) {
		return (
			<BackendMessage messageType={messageType}>
				{message}
			</BackendMessage>
		)
	}

	const userInfo = getUserInfo(data)

	const balances = Object.keys(data.balances).map((q, index) => (
			<tr key={index}>
				<td><Link to={'/q/' + q}>{q}</Link></td>
				<td>{data.balances[q]}</td>
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
					<h3>Refer a friend!</h3>
					{'Let your friends sign up via your link: '}
					{/* TODO GET THIS FUCKING SHIT AWAY */}
					{window.location.host + '/signup?referred_by=' + user}
				</CenteredDiv>
			</ContentDiv>
		</PageDiv>
	)
}

export default ProfilePage
