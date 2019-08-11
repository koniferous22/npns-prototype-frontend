import { userConstants } from '../constants/user-constants';

export const alertActions = {
	alert
};

function alert(message) { return dispatch => {
		dispatch({type: userConstants.ALERT_MESSAGE, message})
	}
}