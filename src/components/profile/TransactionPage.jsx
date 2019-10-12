import React from 'react';
import ProfileSidebar from './ProfileSidebar'

const TranscationPage = (props) => (
	<div>
		<ProfileSidebar baseUrl={'/u/' + props.user} auth_view/>
		Transactionsssss
	</div>
)

export default TranscationPage;
