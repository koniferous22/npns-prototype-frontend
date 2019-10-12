import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'

const ActivityPage = props => {
	const base_url = '/u/' + props.user
	const auth_view = (props.user === props.viewer && props.loggedIn)

	return (<div>
		<ProfileSidebar baseUrl={'/u/' + props.user} auth_view={auth_view}/>
		ActivitiPage
	</div>)
}
export default ActivityPage