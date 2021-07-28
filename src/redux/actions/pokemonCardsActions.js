import PokemonCardsApiService from 'services/pokemonCardsApi'
import {
  POKEMONCARDS_DATA_SUCCESS,
  POKEMONCARDS_DATA_ERROR,
  POKEMONCARDS_RARITIES_DATA_SUCCESS,
  POKEMONCARDS_RARITIES_DATA_ERROR,
  POKEMONCARDS_SUBTYPES_DATA_SUCCESS,
  POKEMONCARDS_SUBTYPES_DATA_ERROR
} from 'redux/types/pokemonCardsTypes'

export const getCardsParamsInfo = () => async dispatch => {}

export const getCards = () => async dispatch => {
  dispatch({ type: 'API_REQUEST_START' })

  try {
    const cards = await PokemonCardsApiService.getCards()
    const cardsJson = cards.json()

    dispatch({
      type: POKEMONCARDS_DATA_SUCCESS,
      payload: cardsJson.cards
    })
  } catch (err) {
    dispatch({ type: POKEMONCARDS_DATA_ERROR, error: err })
  }
}

export const getCardsRarities = () => async dispatch => {
  dispatch({ type: 'API_REQUEST_START' })

  try {
    const rarities = await PokemonCardsApiService.getCardsRarities()
    const raritiesJson = rarities.json()

    dispatch({
      type: POKEMONCARDS_RARITIES_DATA_SUCCESS,
      payload: raritiesJson.cards
    })
  } catch (err) {
    dispatch({ type: POKEMONCARDS_RARITIES_DATA_ERROR, error: err })
  }
}

export const getCardsSubTypes = () => async dispatch => {
  dispatch({ type: 'API_REQUEST_START' })

  try {
    const subtypes = await PokemonCardsApiService.getCardsSubTypes()
    const subtypesJson = subtypes.json()

    dispatch({
      type: POKEMONCARDS_SUBTYPES_DATA_SUCCESS,
      payload: subtypesJson.data
    })
  } catch (err) {
    dispatch({ type: POKEMONCARDS_SUBTYPES_DATA_ERROR, error: err })
  }
}
