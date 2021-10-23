import {
  UPDATE_MINIGAME_LOADING,
  UPDATE_MINIGAME_POKETRIVIA_SUCCESS,
  UPDATE_MINIGAME_POKETRIVIA_ERROR,
  UPDATE_MINIGAME_POKEGUESS_SUCCESS,
  UPDATE_MINIGAME_POKEGUESS_ERROR,
  UPDATE_MINIGAME_POKETYPES_SUCCESS,
  UPDATE_MINIGAME_POKETYPES_ERROR
} from 'redux/types/minigamesTypes';

const initState = {
  isLoading: false,
  minigamesBalance: null,
  error: null
};

const triviaReducer = (state = initState, action) => {
  switch (action.type) {
    case UPDATE_MINIGAME_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UPDATE_MINIGAME_POKETRIVIA_SUCCESS:
      return {
        ...state,
        minigamesBalance: action.payload
      };
    case UPDATE_MINIGAME_POKETRIVIA_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_MINIGAME_POKEGUESS_SUCCESS:
      return {
        ...state,
        minigamesBalance: action.payload
      };
    case UPDATE_MINIGAME_POKEGUESS_ERROR:
      return {
        ...state,
        error: action.payload
      };
    case UPDATE_MINIGAME_POKETYPES_SUCCESS:
      return {
        ...state,
        minigamesBalance: action.payload
      };
    case UPDATE_MINIGAME_POKETYPES_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default triviaReducer;
