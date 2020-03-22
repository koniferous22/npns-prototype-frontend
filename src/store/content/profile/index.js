import { combineReducers } from 'redux'

import personalInformationPageReducer from './personalInformationPage'
import premiumPageReducer from './premiumPage'
import profilePageReducer from './profilePage'
import transactionPageReducer from './transactionPage'
import activityPageReducer from './activityPage'

export default combineReducers({
	activityPage: activityPageReducer,
	premiumPage: premiumPageReducer,
	profilePage: profilePageReducer,
	personalInformationPage: personalInformationPageReducer,
	transactionPage: transactionPageReducer
})