import {
  POKEMON_DATA_SUCCESS,
  POKEMON_DATA_ERROR,
  POKEMON_EVCHAIN_DATA_ERROR,
  POKEMON_ALTERNATEFORM_DATA_ERROR,
  POKELIST_PAGE_DATA_ERROR,
  POKELIST_PAGE_DATA_SUCCESS,
  POKEDEX_DATA_LOADING,
  POKEDEX_DATA_SUCCESS,
  POKEDEX_DATA_ERROR,
  POKEMON_REGIONS_GAMES_LOADING,
  POKEMON_REGIONS_GAMES_SUCCESS,
  POKEMON_REGIONS_GAMES_ERROR,
  API_REQUEST_START
} from 'redux/types/pokemonTypes';

const initState = {
  isLoading: false,
  isLoadingPokedex: false,
  isLoadingGamesRegions: false,
  error: null,
  errorEvChain: null,
  errorAltForm: null,
  errorPokedex: null,
  errorGamesRegion: null,
  data: {
    pokemon: null,
    pokemonEvChain: null,
    pokemonAlternateForms: null,
    pokedex: null,
    pokedexDropdowns: {
      regions: null,
      types: null
    }
  }
};

const pokemonReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CLEAN_ERRORS':
      return {
        ...state,
        error: false,
        errorPokedex: false,
        errorGamesRegion: false
      };
    case API_REQUEST_START:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case POKEMON_DATA_SUCCESS:
      return {
        ...state,
        error: null,
        errorAltForm: null,
        errorEvChain: null,
        isLoading: false,
        data: {
          ...state.data,
          pokemon: action.payload.pokeData,
          pokemonEvChain: action.payload.pokeEvChain,
          pokemonAlternateForms: action.payload.pokeAlternateF
        }
      };
    case POKEMON_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case POKEMON_ALTERNATEFORM_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        errorAltForm: action.payload
      };
    case POKEMON_EVCHAIN_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        errorEvChain: action.payload.error
      };
    case POKELIST_PAGE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: {
          ...state.data,
          pokedex: action.payload.pokedex,
          pokedexDropdowns: {
            regions: action.payload.regions,
            types: action.payload.types
          }
        }
      };
    case POKELIST_PAGE_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case POKEDEX_DATA_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case POKEDEX_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: { ...state.data, pokedex: action.payload }
      };
    case POKEDEX_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        errorPokedex: action.payload
      };
    case POKEMON_REGIONS_GAMES_LOADING:
      return {
        ...state,
        isLoadingGamesRegions: true
      };
    case POKEMON_REGIONS_GAMES_SUCCESS:
      return {
        ...state,
        isLoadingGamesRegions: false
      };
    case POKEMON_REGIONS_GAMES_ERROR:
      return {
        ...state,
        isLoadingGamesRegions: false,
        errorGamesRegion: action.payload
      };
    default:
      return state;
  }
};

export default pokemonReducer;
