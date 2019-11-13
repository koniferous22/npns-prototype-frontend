import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'
import { premiumPageActions } from '../../actions/content/profile/premiumPage'

import ContentDiv from '../../styled-components/defaults/ContentDiv'
import Button from '../../styled-components/defaults/Button'

const mapStateToProps = state => state.content.profile.premiumPage
const mapDispatchToProps = dispatch => ({
	subscribe: () => dispatch(premiumPageActions.subscribe()),
	unsubscribe: () => dispatch(premiumPageActions.unsubscribe())
})

const PremiumPage = (props) => (<div>
		<ProfileSidebar baseUrl={'/u/' + props.user} auth_view/>
		<ContentDiv sidebar>
			{props.text}
			{props.premiumActive ? <Button onClick={() => props.unsubscribe()}>Unsubscribe</Button> : <Button onClick={() => props.subscribe()}>Subscribe</Button>}
		</ContentDiv>
	</div>
)

export default connect(mapStateToProps, mapDispatchToProps)(PremiumPage)
