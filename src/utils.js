export const fetchData = (backendEndpoint, request, onFetching, onSuccess, onError, settings) => dispatch => { 
	dispatch(onFetching());
	return fetch(appConfig.backendUrl + endpoint, request)
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
