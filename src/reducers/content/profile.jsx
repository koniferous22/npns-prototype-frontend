import { combineReducers } from 'redux'

import transactionPageReducer from './profile/transactionPage'
import premiumPageReducer from './profile/premiumPage'

export default combineReducers({
	//transactionPage: transactionPageReducer,
	premiumPage: premiumPageReducer
})