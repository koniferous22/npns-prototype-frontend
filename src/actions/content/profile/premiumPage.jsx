import { premiumPageConstants } from '../../../constants/content/profile/premiumPage';

function subscribe() {
	return {
		type: premiumPageConstants.SUBSCRIBE
	}
}

function unsubscribe() {
	return {
		type: premiumPageConstants.UNSUBSCRIBE
	}
}

export const premiumPageActions = {
	subscribe,
	unsubscribe
}