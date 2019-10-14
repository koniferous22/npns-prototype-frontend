import { economyPageConstants } from '../../constants/content/economyPage'

const defaultState = {}

function economyPageReducer(state = defaultState, action) {
	switch (action.type) {
		case economyPageConstants.LOAD_KARMA_VALUES_REQUEST:
			return {
        message: "Loading data..." 
			}
		case economyPageConstants.LOAD_KARMA_VALUES_SUCCESS:
      var newState = {}
      var karmaValues = {}
      for (const set of state) {
        karmaValues[set.name] = set.karmaValue
      }
      newState['karmaValues'] = karmaValues
			return newState
			//osetrit null a undefined
		case economyPageConstants.LOAD_KARMA_VALUES_FAILED:
			return {
        message: action.message //snad takto + tu mam vratit aj predosly state
      }
		default:
			return state
	}
}

export default economyPageReducer
