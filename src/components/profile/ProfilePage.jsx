import React from 'react';
import ProfileSidebar from './ProfileSidebar'


const ProfilePage = (props) => {
	const base_url = '/u/' + props.viewer
	const auth_view = (props.user === props.viewer && props.loggedIn)

	return (
		<div>
			{auth_view && <ProfileSidebar baseUrl={base_url}/>}
			ProfilePage
		</div>
	);
}
export default ProfilePage;
