import { combineReducers } from 'redux'

import economyPageReducer from './statistics/economyPage'

export default combineReducers({
	economyPage: economyPageReducer
})