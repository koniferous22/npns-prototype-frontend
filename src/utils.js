import { appConfig } from './appConfig'

export const fetchData = (backendEndpoint, request, onFetching, onSuccess, onError) => dispatch => { 
	dispatch(onFetching());
	return fetch(appConfig.backendUrl + backendEndpoint, request)
		.then(response => {
			if (response.status >= 200 && response.status < 400){
				return response
			} else {
				var error = new Error(response.statusText)
				error.response = response;
				throw error;
			}
		}).then(response => {
			return response.json()
		})
		.then(response => {
			dispatch(onSuccess(response))
		}).catch(error => {
			dispatch(onError(error))
		});
}

export const dateTimeOptions = {
	year: 'numeric',
	month: 'numeric',
	day: 'numeric',
	hour: 'numeric',
	minute: 'numeric'	
}

export const dateTimeDefaultLocale = 'en-GB'

// TODO refactor as typescript enum
export const messageType = {
	INFO: "INFO",
	ERROR: "ERROR"
}