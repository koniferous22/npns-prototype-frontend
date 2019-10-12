import React from 'react'
import ProfileSidebar from './ProfileSidebar'

const PremiumPage = (props) => (<div>
	<ProfileSidebar baseUrl={'/u/' + props.user} />
	PremiumPage
</div>)

export default PremiumPage
