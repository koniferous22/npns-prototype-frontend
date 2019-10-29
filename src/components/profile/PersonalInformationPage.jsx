import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'

import ChangeEmailForm from './PersonalInformationPage/ChangeEmailForm'
import ChangePasswordForm from './PersonalInformationPage/ChangePasswordForm'
import ChangeUsernameForm from './PersonalInformationPage/ChangeUsernameForm'
import ChangeNamesForm from './PersonalInformationPage/ChangeNamesForm'


import ConfirmPasswordForm from './PersonalInformationPage/ConfirmPasswordForm'
import ProfileUpdateDispatcher from './PersonalInformationPage/ProfileUpdateDispatcher'

import { personalInformationPageStages } from '../../constants/content/profile/personalInformationPage'

const mapStateToProps = state => state.content.profile.personalInformationPage.page

/*const mapDispatchToProps = dispatch => ({
	reset: () => {console.log('kokot')}
})*/

class PersonalInformationPage extends React.Component {
	componentWillUnmount() {
		// reset
	}

	render() {
		console.log(this.props)
		switch (this.props.stage) {
			case personalInformationPageStages.PASSWORD_CONFIRMATION:
				return (
					<div>
						{'Please confirm by entering your ' + (this.props.form === 'password' ? 'current ' : '') + 'password'}
						<ConfirmPasswordForm form={this.props.form} token={this.props.token} />
					</div>
				)
			case personalInformationPageStages.COMPLETED:
				return (
					<div>
						<ProfileUpdateDispatcher form={this.props.form} token={this.props.token} values={this.props.values} user={this.props.user}/>
						{this.props.message}
					</div>
				)
			case personalInformationPageStages.SUBMITTING_FORM:
			default:
				return (<div>
					<ProfileSidebar baseUrl={'/u/' + this.props.user} auth_view/>
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
				</div>)
		}
	}
}

export default connect(mapStateToProps)(PersonalInformationPage)
