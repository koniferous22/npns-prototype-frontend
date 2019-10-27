import { combineReducers } from 'redux'

import personalInformationPageReducer from './profile/personalInformationPage'
import premiumPageReducer from './profile/premiumPage'
import profilePageReducer from './profile/profilePage'
import transactionPageReducer from './profile/transactionPage'

export default combineReducers({
	//transactionPage: transactionPageReducer,
	premiumPage: premiumPageReducer,
	profilePage: profilePageReducer,
	personalInformationPage: personalInformationPageReducer
})