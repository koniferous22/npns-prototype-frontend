import { combineReducers } from 'redux'

import personalInformationPageReducer from './profile/personalInformationPage'
import premiumPageReducer from './profile/premiumPage'
import profilePageReducer from './profile/profilePage'
import transactionPageReducer from './profile/transactionPage'
import activityPageReducer from './profile/activityPage'

export default combineReducers({

	activityPage: activityPageReducer,
	premiumPage: premiumPageReducer,
	profilePage: profilePageReducer,
	personalInformationPage: personalInformationPageReducer,
	transactionPage: transactionPageReducer
})