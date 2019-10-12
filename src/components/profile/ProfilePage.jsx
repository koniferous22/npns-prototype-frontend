import React from 'react';
import ProfileSidebar from './ProfileSidebar'


const ProfilePage = (props) => {
	const base_url = '/u/' + props.user
	const auth_view = (props.user === props.viewer && props.loggedIn)

	return (
		<div>
			<ProfileSidebar baseUrl={base_url} auth_view={auth_view}/>
			<p>
				{'Public profile page of user: ' + props.user}
				<br/>
				{'Stuff will be probably added l8r'}
			</p>
		</div>
	);
}
export default ProfilePage;
