import { authConstants } from '../constants/auth';
import { appConfig } from '../appConfig'

export const authActions = {
    login,
    logout
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));
        // 2. parse result und depending on that stuff, dispatch success/failure action/reducer idk
		
        fetch(appConfig.backendUrl + "/signin", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        }).then(response => {
            //console.log("Hell yeah, status: " + response.status)
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
            console.log(response.user)
            // TODO: verify 401 status as decide between server and client error
            localStorage.setItem('token', JSON.stringify(response.token));
            dispatch(success(response.user, response.token))
        }).catch(error => {
            dispatch(invalid_credentials(error))
        })
    };

    function request(user) { return { type: authConstants.LOGIN_REQUEST, user: user } }
    function success(user, token) { return { type: authConstants.LOGIN_SUCCESS, user, login} }
    function invalid_credentials(error) { return { type: authConstants.LOGIN_INVALID_CREDENTIALS, error: error } }
}

function logout(token) {
    // NOTE: dunno what this does but looks cool
    console.log(token)
    fetch(appConfig.backendUrl + "/logout?token=" + token,{
        method: 'GET',
    });
    return { type: authConstants.LOGOUT };
}