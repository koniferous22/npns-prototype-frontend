import { userConstants } from '../constants/user-constants';
import { appConfig } from '../appConfig'

export const userActions = {
    login,
    logout,
    register
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
            console.log("Hell yeah, status: " + response.status)
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
            console.log('friend',response.user)
            // NOTE: dunno what this does but lets try anyways
            localStorage.setItem('user', JSON.stringify(response.user));
            localStorage.setItem('userId', response.user._id);
            dispatch(success(response.token))
        }).catch(error => {
            dispatch(failure(error))
        })
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user: user } }
    function success(token) { return { type: userConstants.LOGIN_SUCCESS, token: token } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error: error } }
}

function logout(token) {
    // NOTE: dunno what this does but looks cool
    console.log(token)
    fetch(appConfig.backendUrl + "/logout?token=" + token,{
        method: 'GET',
    });
    return { type: userConstants.LOGOUT };
}

function register(user) {
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
    
    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
    
}
