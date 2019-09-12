import { appConfig } from '../../appConfig'
import { problemConstants } from '../../constants/problem-constants';

export const problemActions = {
    add
};

function add(problem) {
    return dispatch => {
        dispatch(request(problem));

        fetch(appConfig.backendUrl + "/problem/add", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(problem)
        }).then(response => {
            // NOTE: refactor this my friend
            if (response.status >= 200 && response.status < 400) {
                return response
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }
        }).then(response => response.json())
        .then(problem => {
            dispatch(success(problem))
        }).catch(error => {
            dispatch(failure(error))
        })
    }
    
    function request(problem) { return { type: problemConstants.ADD_REQUEST, problem } }
    function success(problem) { return { type: problemConstants.ADD_SUCCESS, problem } }
    function failure(error) { return { type: problemConstants.ADD_FAILURE, error } }
    
}
