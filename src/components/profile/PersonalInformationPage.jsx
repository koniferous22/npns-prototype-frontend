import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'
import ChangeEmailForm from './PersonalInformationPage/ChangeEmailForm'
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
		switch (this.props.stage) {
			case personalInformationPageStages.PASSWORD_CONFIRMATION:
				return (
					<div>
						{'Please confirm by entering your ' + (this.props.form === 'password' ? 'current ' : '') + 'password'}
						<ConfirmPasswordForm form={this.props.form} token={this.props.token} />
					</div>
				)
			case personalInformationPageStages.COMPLETED:
				console.log('COMPLETED')
				console.log(this.props)
				return (
					<div>
						<ProfileUpdateDispatcher form={this.props.form} token={this.props.token} values={this.props.values}/>
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


				</div>)
		}
	}
}

export default connect(mapStateToProps)(PersonalInformationPage)
