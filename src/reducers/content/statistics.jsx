import { combineReducers } from 'redux'

import economyPageReducer from './statistics/economyPage'
import scoreboardPageReducer from './statistics/scoreboardPage'

export default combineReducers({
	economyPage: economyPageReducer,
	scoreboard: scoreboardPageReducer
})