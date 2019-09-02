import { registrationConstants } from '../constants/registration';
import { appConfig } from '../appConfig'

export const registrationActions = {
    signup
};

function signup(user) {
    return dispatch => {
        dispatch(request(user));

        fetch(appConfig.backendUrl + "/signup", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        }).then(response => {
            // NOTE: refactor this
            if (response.status >= 200 && response.status < 400) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(response => response.json())
        .then(user => {
            dispatch(success(user))
        }).catch(error => {
            dispatch(failure(error))
        })
    }
    
    function request(user) { return { type: registrationConstants.REQUEST, user } }
    function success(user) { return { type: registrationConstants.SUCCESS, user } }
    function failure(error) { return { type: registrationConstants.FAILURE, error } }
    
}
