import React from 'react'
import { connect } from 'react-redux'

import ProfileSidebar from './ProfileSidebar'
import { premiumPageActions } from '../../actions/content/profile/premiumPage'

const mapStateToProps = state => state.content.profile.premiumPage
const mapDispatchToProps = dispatch => ({
	subscribe: () => dispatch(premiumPageActions.subscribe()),
	unsubscribe: () => dispatch(premiumPageActions.unsubscribe())
})

const PremiumPage = (props) => (<div>
		<ProfileSidebar baseUrl={'/u/' + props.user} auth_view/>
		{props.text}
		{props.premiumActive ? <button onClick={() => props.unsubscribe()}>Unsubscribe</button> : <button onClick={() => props.subscribe()}>Subscribe</button>}
	</div>
)

export default connect(mapStateToProps, mapDispatchToProps)(PremiumPage)