export const alertActions = {
	alert
};

function alert(message) { return dispatch => {
		dispatch({type: 'MIAOW', message})
	}
}