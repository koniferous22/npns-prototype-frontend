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
      newState['karmaValues'] = action.data
      return newState
		case economyPageConstants.LOAD_KARMA_VALUES_FAILED:
			return {
        message: action.message //tu asi este vratit aj predosly state
      }
		default:
			return state
	}
}
//este osetrit null a undefined
export default economyPageReducer
