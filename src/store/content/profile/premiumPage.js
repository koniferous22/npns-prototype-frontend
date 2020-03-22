const SUBSCRIBE = 'PROFILE_PREMIUM_SUBSCRIBE'
const UNSUBSCRIBE = 'PROFILE_PREMIUM_UNSUBSCRIBE'

const defaultState = {
	premiumActive: false,
	text: 'Sumscribe to premium'
}

export default function premiumPageReducer(state=defaultState, action) {
	switch (action.type) {
		case SUBSCRIBE:
			return {
				premiumActive: true,
				text: 'You\'ve just  sumscribed to premium, it duznt really contain any benefits, click down below to unsubscribe for special reward'
			}
		case UNSUBSCRIBE:
			return {
				premiumActive: false,
				text: 'You\'ve just unsubscribed from premium, hopw you had fun.. click down below to sumscrible again'
			}
		default:
			return state
	}
}

export const subscribe = () => ({
	type: SUBSCRIBE
})

export const unsubscribe = () => ({
	type: UNSUBSCRIBE
})
