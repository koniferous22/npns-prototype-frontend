import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'
import { premiumPageActions } from '../../actions/content/profile/premiumPage'

import PageDiv from '../../styled-components/defaults/PageDiv'
import ContentDiv from '../../styled-components/defaults/ContentDiv'
import CenteredDiv from '../../styled-components/defaults/CenteredDiv'
import Button from '../../styled-components/defaults/Button'

const mapStateToProps = state => state.content.profile.premiumPage
const mapDispatchToProps = dispatch => ({
	subscribe: () => dispatch(premiumPageActions.subscribe()),
	unsubscribe: () => dispatch(premiumPageActions.unsubscribe())
})

const PremiumPage = (props) => (<PageDiv>
		<ProfileSidebar baseUrl={'/u/' + props.user} auth_view/>
		<ContentDiv sidebar>
			<CenteredDiv fullWidth>
				<p>{props.text}</p>
				{props.premiumActive ? <Button onClick={() => props.unsubscribe()}>Unsubscribe</Button> : <Button onClick={() => props.subscribe()}>Subscribe</Button>}
			</CenteredDiv>
		</ContentDiv>
	</PageDiv>
)

export default connect(mapStateToProps, mapDispatchToProps)(PremiumPage)
