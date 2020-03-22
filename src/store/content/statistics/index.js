import { combineReducers } from 'redux'

import economyPageReducer from './economyPage'
import scoreboardPageReducer from './scoreboardPage'

export default combineReducers({
	economyPage: economyPageReducer,
	scoreboard: scoreboardPageReducer
})