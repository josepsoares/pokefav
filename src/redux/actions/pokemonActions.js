import PokemonApiService from 'services/pokemonApi';
import {
  POKEMON_DATA_SUCCESS,
  POKEMON_DATA_ERROR,
  // POKEMON_EVCHAIN_DATA_ERROR,
  // POKEMON_ALTERNATEFORM_DATA_ERROR,
  POKELIST_PAGE_DATA_ERROR,
  POKELIST_PAGE_DATA_SUCCESS,
  POKEMON_REGIONS_GAMES_LOADING,
  POKEMON_REGIONS_GAMES_SUCCESS,
  POKEMON_REGIONS_GAMES_ERROR,
  // POKEDEX_DATA_LOADING,
  POKEDEX_DATA_SUCCESS,
  POKEDEX_DATA_ERROR,
  API_REQUEST_START
} from 'redux/types/pokemonTypes';

export const getInfoPokemonPage = pokemon => async dispatch => {
  dispatch({ type: API_REQUEST_START });

  try {
    const pokemonDataReq = await PokemonApiService.getInfoPokemonPageReq(
      pokemon
    );

    dispatch({
      type: POKEMON_DATA_SUCCESS,
      payload: {
        pokeData: pokemonDataReq.pokemonData,
        pokeEvChain: pokemonDataReq.pokemonEvChainData,
        pokeAlternateF: pokemonDataReq.pokemonAlternateForms
      }
    });
  } catch (err) {
    dispatch({ type: POKEMON_DATA_ERROR, payload: err });
  }
};

export const getDataPokeListPage = () => async dispatch => {
  dispatch({ type: API_REQUEST_START });

  try {
    const infoForPokeList = await PokemonApiService.getDataPokeListPageReq();

    dispatch({
      type: POKELIST_PAGE_DATA_SUCCESS,
      payload: {
        regions: infoForPokeList[0].results,
        types: infoForPokeList[1].results,
        pokedex: infoForPokeList[2].pokemon_entries
      }
    });
  } catch (err) {
    dispatch({ type: POKELIST_PAGE_DATA_ERROR, payload: err });
  }
};

export const getPokedex = pokedex => async dispatch => {
  dispatch({ type: API_REQUEST_START });

  try {
    const pokedexReq = await PokemonApiService.getPokedexReq(pokedex);
    const pokedexData = pokedexReq.json();

    dispatch({
      type: POKEDEX_DATA_SUCCESS,
      payload: pokedexData
    });
  } catch (err) {
    dispatch({ type: POKEDEX_DATA_ERROR, payload: err });
  }
};

export const getRegionsAndGames = () => async dispatch => {
  dispatch({ type: POKEMON_REGIONS_GAMES_LOADING });

  try {
    const infoRegionsGamesReq = await PokemonApiService.getRegionsAndGamesReq();
    const infoRegionsGames = infoRegionsGamesReq.json();

    dispatch({
      type: POKEMON_REGIONS_GAMES_SUCCESS,
      payload: infoRegionsGames
    });
  } catch (err) {
    dispatch({ type: POKEMON_REGIONS_GAMES_ERROR, payload: err });
  }
};
