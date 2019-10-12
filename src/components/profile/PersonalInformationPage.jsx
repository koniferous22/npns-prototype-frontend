import React from 'react'
import ProfileSidebar from './ProfileSidebar'

const PersonalInformationPage = (props) => (<div>
	<ProfileSidebar baseUrl={'/u/' + props.user} />
	PersonalInformationPage
</div>)

export default PersonalInformationPage
