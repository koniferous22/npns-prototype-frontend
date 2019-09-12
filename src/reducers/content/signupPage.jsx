import { reducer } from 'redux-form'
import { combineReducers } from 'redux'

import { signupConstants } from '../../constants/signup'

const initialState = {}

const signupPageReducer = (state = initialState, action) => {
	switch (action.type) {
		case signupConstants.REQUEST:
			return {}
		case signupConstants.SUCCESS:
			return {}
		case signupConstants.FAILED:
			return {}
		default:
			return state
	}
}


const signupFormReducer = reducer;

export default combineReducers({
	page: signupPageReducer,
	form: signupFormReducer
})
