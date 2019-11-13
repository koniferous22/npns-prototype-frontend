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

import ContentDiv from '../../styled-components/defaults/ContentDiv'

const mapStateToProps = state => state.content.profile.personalInformationPage.page

const mapDispatchToProps = dispatch => ({
	reset: () => dispatch(personalInformationPageActions.reset())
})

class PersonalInformationPage extends React.Component {
	componentWillUnmount() {
		this.props.reset()
	}

	render() {
		switch (this.props.stage) {
			case personalInformationPageStages.PASSWORD_CONFIRMATION:
				return (
					<ContentDiv>
						{'Please confirm by entering your ' + (this.props.form === 'password' ? 'current ' : '') + 'password'}
						<ConfirmPasswordForm form={this.props.form} token={this.props.token} />
					</ContentDiv>
				)
			case personalInformationPageStages.COMPLETED:
				return (
					<ContentDiv>
						<ProfileUpdateDispatcher form={this.props.form} token={this.props.token} values={this.props.values} user={this.props.user}/>
						{this.props.message}
					</ContentDiv>
				)
			case personalInformationPageStages.SUBMITTING_FORM:
			default:
				return (
					<div>
						<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view/>
						<ContentDiv sidebar>
							{!this.props.form && this.props.message}

							Change Email
							<ChangeEmailForm />
							{this.props.form === 'email' && this.props.message}

							Change Password
							<ChangePasswordForm />
							{this.props.form === 'password' && this.props.message}
							
							Change Username
							<ChangeUsernameForm />
							{this.props.form === 'username' && this.props.message}

							Change Names
							<ChangeNamesForm />
							{this.props.form === 'names' && this.props.message}
						</ContentDiv>
					</div>
				)
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformationPage)
