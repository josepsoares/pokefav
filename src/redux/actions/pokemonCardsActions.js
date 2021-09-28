import PokemonCardsApiService from 'services/pokemonCardsApi';
import {
  POKEMONCARDS_DATA_LOADING,
  POKEMONCARDS_DATA_SUCCESS,
  POKEMONCARDS_DATA_ERROR,
  POKEMONCARDS_NEXT_CARDS_DATA_LOADING,
  POKEMONCARDS_NEXT_CARDS_DATA_SUCCESS,
  POKEMONCARDS_NEXT_CARDS_DATA_ERROR,
  POKEMONCARDS_RARITIES_DATA_LOADING,
  POKEMONCARDS_RARITIES_DATA_SUCCESS,
  POKEMONCARDS_RARITIES_DATA_ERROR
} from 'redux/types/pokemonCardsTypes';

export const getCards =
  (name, rarity, orderBy, page, pageSize) => async dispatch => {
    dispatch({
      type:
        page === 1
          ? POKEMONCARDS_DATA_LOADING
          : POKEMONCARDS_NEXT_CARDS_DATA_LOADING
    });

    try {
      const cards = await PokemonCardsApiService.getCards(
        name,
        rarity,
        orderBy,
        page,
        pageSize
      );
      const cardsJson = await cards.json();

      dispatch({
        type:
          page === 1
            ? POKEMONCARDS_DATA_SUCCESS
            : POKEMONCARDS_NEXT_CARDS_DATA_SUCCESS,
        payload: cardsJson.data
      });
    } catch (err) {
      dispatch({
        type:
          page === 1
            ? POKEMONCARDS_DATA_ERROR
            : POKEMONCARDS_NEXT_CARDS_DATA_ERROR,
        error: err
      });
    }
  };

export const getCardsRarities = () => async dispatch => {
  dispatch({ type: POKEMONCARDS_RARITIES_DATA_LOADING });

  try {
    const rarities = await PokemonCardsApiService.getCardsRarities();
    const raritiesJson = rarities.json();

    dispatch({
      type: POKEMONCARDS_RARITIES_DATA_SUCCESS,
      payload: raritiesJson.cards
    });
  } catch (err) {
    dispatch({ type: POKEMONCARDS_RARITIES_DATA_ERROR, error: err });
  }
};
