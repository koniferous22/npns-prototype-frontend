import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'

import ChangeEmailForm from './PersonalInformationPage/ChangeEmailForm'
import ChangePasswordForm from './PersonalInformationPage/ChangePasswordForm'
import ChangeUsernameForm from './PersonalInformationPage/ChangeUsernameForm'
import ChangeNamesForm from './PersonalInformationPage/ChangeNamesForm'


import ConfirmPasswordForm from './PersonalInformationPage/ConfirmPasswordForm'
import ProfileUpdateDispatcher from './PersonalInformationPage/ProfileUpdateDispatcher'

import { personalInformationPageActions } from '../../actions/content/profile/personalInformationPage'
import { personalInformationPageStages } from '../../constants/content/profile/personalInformationPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import BackendMessage from '../../styled-components/BackendMessage'

const mapStateToProps = state => state.content.profile.personalInformationPage.page

const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(personalInformationPageActions.reset())
})

class PersonalInformationPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		const message = this.props.message
		const messageType = this.props.messageType
		const form = this.props.form
		const token = this.props.token
		switch (this.props.stage) {
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
						<ProfileUpdateDispatcher form={form} token={token} values={this.props.values} user={this.props.user}/>
						<BackendMessage messageType={messageType}>
							{message}
				    </BackendMessage>
					</ContentDiv>
				)
			case personalInformationPageStages.SUBMITTING_FORM:
			default:
				return (
					<PageDiv>
						<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view/>
						<ContentDiv sidebar>
							<BackendMessage messageType={messageType}>
								{!form && message}
					    </BackendMessage>

							Change Email
							<ChangeEmailForm />
							<BackendMessage messageType={messageType}>
								{form === 'email' && message}
				    	</BackendMessage>
							
							Change Password
							<ChangePasswordForm />
							<BackendMessage messageType={messageType}>
								{form === 'password' && message}
				    	</BackendMessage>
							
							Change Username
							<ChangeUsernameForm />
							<BackendMessage messageType={messageType}>
								{form === 'username' && message}
				    	</BackendMessage>

							Change Names
							<ChangeNamesForm />
							<BackendMessage messageType={messageType}>
								{form === 'names' && message}
				    	</BackendMessage>
						</ContentDiv>
					</PageDiv>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformationPage)
