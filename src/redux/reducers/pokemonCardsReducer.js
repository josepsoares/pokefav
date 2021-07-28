import {
  POKEMONCARDS_DATA_SUCCESS,
  POKEMONCARDS_DATA_ERROR,
  POKEMONCARDS_RARITIES_DATA_SUCCESS,
  POKEMONCARDS_RARITIES_DATA_ERROR,
  POKEMONCARDS_SUBTYPES_DATA_SUCCESS,
  POKEMONCARDS_SUBTYPES_DATA_ERROR
} from 'redux/types/pokemonCardsTypes'

const initState = {
  updateTriviaResult: null,
  updateTriviaResultError: null
}

const pokemonCardsReducer = (state = initState, action) => {
  switch (action.type) {
    case POKEMONCARDS_DATA_SUCCESS:
      return {
        ...state,
        updateTriviaResult: 'Trivia Results Updated'
      }
    case POKEMONCARDS_DATA_ERROR:
      return {
        ...state,
        updateTriviaResultError: action.error
      }
    case POKEMONCARDS_RARITIES_DATA_SUCCESS:
      return {
        ...state,
        updateTriviaResultError: action.error
      }
    case POKEMONCARDS_RARITIES_DATA_ERROR:
      return {
        ...state,
        updateTriviaResultError: action.error
      }
    case POKEMONCARDS_SUBTYPES_DATA_SUCCESS:
      return {
        ...state,
        updateTriviaResultError: action.error
      }
    case POKEMONCARDS_SUBTYPES_DATA_ERROR:
      return {
        ...state,
        updateTriviaResultError: action.error
      }
    default:
      return state
  }
}

export default pokemonCardsReducer
