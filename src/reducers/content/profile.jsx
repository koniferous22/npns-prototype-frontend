import { combineReducers } from 'redux'

import transactionPageReducer from './profile/transactionPage'

export default combineReducers({
	transactionPage: transactionPageReducer
})