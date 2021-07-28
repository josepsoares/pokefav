import {
  UPDATE_MINIGAME_POKETRIVIA_SUCCESS,
  UPDATE_MINIGAME_POKETRIVIA_ERROR,
  UPDATE_MINIGAME_POKEGUESS_SUCCESS,
  UPDATE_MINIGAME_POKEGUESS_ERROR,
  UPDATE_MINIGAME_POKETYPES_SUCCESS,
  UPDATE_MINIGAME_POKETYPES_ERROR
} from 'redux/types/minigamesTypes'

const initState = {
  updateTriviaResult: null,
  updateTriviaResultError: null
}

const triviaReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MINIGAME_POKETRIVIA_SUCCESS:
      return {
        ...state,
        updateTriviaResult: 'Trivia Results Updated'
      }
    case UPDATE_MINIGAME_POKETRIVIA_ERROR:
      return {
        ...state,
        updateTriviaResultError: action.error
      }
    default:
      return state
  }
}

export default triviaReducer
