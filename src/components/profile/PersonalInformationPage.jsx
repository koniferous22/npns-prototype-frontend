import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'

import ChangeEmailForm from './PersonalInformationPage/ChangeEmailForm'
import ChangePasswordForm from './PersonalInformationPage/ChangePasswordForm'
import ChangeUsernameForm from './PersonalInformationPage/ChangeUsernameForm'
import ChangeNamesForm from './PersonalInformationPage/ChangeNamesForm'

import ConfirmPasswordForm from './PersonalInformationPage/ConfirmPasswordForm'
import ProfileUpdateDispatcher from './PersonalInformationPage/ProfileUpdateDispatcher'

import {
	personalInformationPageStages,
	reset
} from '../../store/content/profile/personalInformationPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import BackendMessage from '../../styled-components/defaults/BackendMessage'


const PersonalInformationPage = ({ user, token, loggedIn, viewer }) => {
	const { message, messageType, stage, values, form } = useSelector(state => state.content.profile.personalInformationPage.page)
	const dispatch = useDispatch()

	useEffect(() => {
		return () => {
			dispatch(reset())
		};
	}, [dispatch]);

	switch (stage) {
		case personalInformationPageStages.PASSWORD_CONFIRMATION:
			return (
				<ContentDiv>
					{'Please confirm by entering your ' + (form === 'password' ? 'current ' : '') + 'password'}
					<ConfirmPasswordForm form={form} token={token} />
				</ContentDiv>
			)
		case personalInformationPageStages.COMPLETED:
			return (
				<ContentDiv>
					<ProfileUpdateDispatcher form={form} token={token} values={values} user={user}/>
					<BackendMessage messageType={messageType}>
						{message}
					</BackendMessage>
				</ContentDiv>
			)
		case personalInformationPageStages.SUBMITTING_FORM:
		default:
			return (
				<PageDiv>
					<ProfileSidebar baseUrl={'/u/' + user} auth_view/>
					<ContentDiv sidebar>
						<CenteredDiv fullWidth>
							<BackendMessage messageType={messageType}>
								{!form && message}
							</BackendMessage>

							<ChangeEmailForm />
							<BackendMessage messageType={messageType}>
								{form === 'email' && message}
							</BackendMessage>
							
							<ChangePasswordForm />
							<BackendMessage messageType={messageType}>
								{form === 'password' && message}
							</BackendMessage>
							
							<ChangeUsernameForm />
							<BackendMessage messageType={messageType}>
								{form === 'username' && message}
							</BackendMessage>

							<ChangeNamesForm />
							<BackendMessage messageType={messageType}>
								{form === 'names' && message}
							</BackendMessage>
						</CenteredDiv>
					</ContentDiv>
				</PageDiv>
			)
	}
}

export default PersonalInformationPage
