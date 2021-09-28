import {
  POKEMONCARDS_DATA_LOADING,
  POKEMONCARDS_DATA_SUCCESS,
  POKEMONCARDS_DATA_ERROR,
  POKEMONCARDS_RARITIES_DATA_LOADING,
  POKEMONCARDS_RARITIES_DATA_SUCCESS,
  POKEMONCARDS_RARITIES_DATA_ERROR,
  POKEMONCARDS_NEXT_CARDS_DATA_LOADING,
  POKEMONCARDS_NEXT_CARDS_DATA_SUCCESS,
  POKEMONCARDS_NEXT_CARDS_DATA_ERROR
} from 'redux/types/pokemonCardsTypes';

const initState = {
  isLoadingCardsData: false,
  errorCardsData: null,
  cardsData: [],
  page: 1,
  isLoadingNextPage: false,
  errorNextPage: null,
  rarities: [],
  isLoadingRarities: false,
  errorRarities: null
};

const pokemonCardsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CLEAN_ERRORS':
      return {
        ...state,
        errorCardsData: false,
        errorNextPage: false,
        errorRarities: false
      };
    case POKEMONCARDS_DATA_LOADING:
      return {
        ...state,
        error: false,
        isLoadingCardsData: true
      };
    case POKEMONCARDS_DATA_SUCCESS:
      return {
        ...state,
        isLoadingCardsData: false,
        cardsData: action.payload
      };
    case POKEMONCARDS_DATA_ERROR:
      return {
        ...state,
        isLoadingCardsData: false,
        errorCardsData: true
      };
    case POKEMONCARDS_RARITIES_DATA_LOADING:
      return {
        ...state,
        errorRarities: false,
        isLoadingRarities: true
      };
    case POKEMONCARDS_RARITIES_DATA_SUCCESS:
      const cardsArray = [];

      action.payload.forEach(rarity => {
        cardsArray.push({ value: rarity.toLowerCase(), label: rarity });
      });

      return {
        ...state,
        isLoadingRarities: false,
        rarities: cardsArray
      };
    case POKEMONCARDS_RARITIES_DATA_ERROR:
      return {
        ...state,
        isLoadingRarities: false,
        updateTriviaResultError: action.error
      };
    case POKEMONCARDS_NEXT_CARDS_DATA_LOADING:
      return {
        ...state,
        isLoadingNextPage: true,
        errorNextPage: false
      };
    case POKEMONCARDS_NEXT_CARDS_DATA_SUCCESS:
      return {
        ...state,
        isLoadingNextPage: false,
        page: state.page++,
        cardsData: state.cardsData.concat(action.payload)
      };
    case POKEMONCARDS_NEXT_CARDS_DATA_ERROR:
      return {
        ...state,
        isLoadingNextPage: false,
        errorRarities: true
      };
    default:
      return state;
  }
};

export default pokemonCardsReducer;
