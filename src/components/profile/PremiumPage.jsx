import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'
import { subscribe, unsubscribe } from '../../store/content/profile/premiumPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import Button from '../../styled-components/defaults/Button'


const PremiumPage = ({ user, loggedIn, viewer }) => {
	const { text, premiumActive } = useSelector(state => state.content.profile.premiumPage)
	const dispatch = useDispatch()
	return(
		<PageDiv>
			<ProfileSidebar baseUrl={'/u/' + user} auth_view/>
			<ContentDiv sidebar>
				<CenteredDiv fullWidth>
					<p>{text}</p>
					{
						premiumActive
							? <Button onClick={() => dispatch(unsubscribe())}>Unsubscribe</Button>
							: <Button onClick={() => dispatch(subscribe())}>Subscribe</Button>
					}
				</CenteredDiv>
			</ContentDiv>
		</PageDiv>
	)
}

export default PremiumPage
