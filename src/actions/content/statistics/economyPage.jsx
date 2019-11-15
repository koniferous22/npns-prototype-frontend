import { appConfig } from '../../../appConfig'
import { economyPageConstants } from '../../../constants/content/statistics/economyPage'
import { messageType } from '../../../constants/backendMessageType'

function loadKarmaValues() {
	const request = () => ({ type: economyPageConstants.LOAD_KARMA_VALUES_REQUEST })
	const success = (data) => ({ type: economyPageConstants.LOAD_KARMA_VALUES_SUCCESS, data })
	const failure = (message) => ({ type: economyPageConstants.LOAD_KARMA_VALUES_FAILED, message, messageType: messageType.ERROR })

	return dispatch => {
	dispatch(request());
	var requestUrl = appConfig.backendUrl + "/queue/karmaValues"
	fetch(requestUrl, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' }
			}).then(response => {
					if (response.status >= 200 && response.status < 400) {
							return response
					} else {
							var error = new Error(response.statusText)
							error.response = response
							throw error
					}
			}).then(response => response.json())
			.then(body => {        
					dispatch(success(body))
			}).catch(error => {
					dispatch(failure(error))
			})
	}
}

export const economyPageActions = {
	loadKarmaValues
}

