import React from 'react';
import ProfileSidebar from './ProfileSidebar'

const TranscationPage = (props) => (
	<div>
		<ProfileSidebar baseUrl={'/u/' + props.user} />
		Transactionsssss
	</div>
)

export default TranscationPage;
