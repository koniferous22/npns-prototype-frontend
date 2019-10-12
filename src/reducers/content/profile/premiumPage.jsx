import { premiumPageConstants } from '../../../constants/content/profile/premiumPage'

const defaultState = {
	premiumActive: false,
	text: 'Sumscribe to premium'
}

function premiumPageReducer(state=defaultState, action) {
	switch (action.type) {
		case premiumPageConstants.SUBSCRIBE:
			return {
				premiumActive: true,
				text: 'You\'ve just  sumscribed to premium, it duznt really contain any benefits, click down below to unsubscribe for special reward'
			}
		case premiumPageConstants.UNSUBSCRIBE:
			return {
				premiumActive: false,
				text: 'You\'ve just unsubscribed from premium, hopw you had fun.. click down below to sumscrible again'
			}
		default:
			return state
	}
}

export default premiumPageReducer