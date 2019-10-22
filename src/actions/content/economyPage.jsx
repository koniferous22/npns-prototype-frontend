import { appConfig } from '../../appConfig'
import { economyPageConstants } from '../../constants/content/economyPage';

function loadKarmaValues(authToken) {
	const request = () => ({ type: economyPageConstants.LOAD_KARMA_VALUES_REQUEST })
	const success = (data) => ({ type: economyPageConstants.LOAD_KARMA_VALUES_SUCCESS, data})
	const failure = (message) => ({ type: economyPageConstants.LOAD_KARMA_VALUES_FAILED, message })

  return dispatch => {
	dispatch(request());
	var requestUrl = appConfig.backendUrl + "/queue/economy/karmaValues"
	fetch(requestUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + authToken }
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

