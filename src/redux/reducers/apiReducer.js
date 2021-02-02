const initState = {
  isLoading: false,
  apiData: {
    signUpData: '',
    getPokemon: '',
    getEvChain: '',
    getAlternateForms: '',
    getPokemonCards: '',
    getPokemonIQ: '',
    getAllUsers: '',
    getLinkUserInfo: '',
    getPokedex: '',
    getPokedexChange: {
      items: '',
      typeSearch: '',
      selectValue: '',
      allPokedexEntries: ''
    },
    getPokedexDropdowns: {
      regions: '',
      types: ''
    },
    getMove: ''
  },
  error: null
}

const apiReducer = (state = initState, action) => {
  switch (action.type) {
    case 'API_REQUEST_START':
      return {
        ...state,
        isLoading: true
      }
    case 'API_REQUEST_END':
      return {
        ...state,
        isLoading: false
      }
    case 'SIGNUP_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        apiData: { ...state.apiData, signUpData: action.payload }
      }
    case 'SIGNUP_DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'POKEMONINFO_DATA_SUCCESS':
      return {
        ...state,
        error: null,
        apiData: { ...state.apiData, getPokemon: action.payload }
      }
    case 'POKEMONINFO_DATA_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'POKEMONINFO_ALTERNATEFORM_DATA_SUCCESS':
      return {
        ...state,
        error: null,
        apiData: {
          ...state.apiData,
          getAlternateForms: action.payload
        }
      }
    case 'POKEMONINFO_ALTERNATEFORM_DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'POKEMONINFO_EVOLUTION_DATA_SUCCESS':
      return {
        ...state,
        error: null,
        apiData: { ...state.apiData, getEvChain: action.payload }
      }
    case 'POKEMONINFO_EVOLUTION_DATA_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'POKEMONCARDS_DATA_SUCCESS':
      return {
        ...state,
        error: null,
        apiData: { ...state.apiData, getPokemonCards: action.payload }
      }
    case 'POKEMONCARDS_DATA_ERROR':
      return {
        ...state,
        apiData: { ...state.apiData, getPokemonCards: { error: action.error } }
      }
    case 'POKEDEX_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        apiData: { ...state.apiData, getPokedex: action.payload }
      }
    case 'POKEDEX_DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    /*case 'POKEDEX_CHANGE_DATA_SUCCESS':
        return {
            ...state,
            isLoading: false,
            error: null,
            apiData: {
                ...state.apiData,
                getPokedexChange:
                {
                    items: action.payload.items,
                    selectValue: action.payload.selectValue,
                    selectList: action.payload.selectList,
                    allPokedexEntries: action.payload.allPokedexEntries
                }
            }
        }
    case 'POKEDEX_CHANGE_DATA_ERROR':
        return {
            ...state,
            isLoading: false,
            error: action.error
        }*/
    case 'POKELIST_PAGE_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        apiData: {
          ...state.apiData,
          getPokedexDropdowns: {
            regions: action.payload[0].results,
            types: action.payload[1].results
          }
        }
      }
    case 'POKELIST_PAGE_DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    case 'POKE_PROFILE_IQ_DATA_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        apiData: {
          ...state.apiData,
          getLinkUserInfo: action.payload.user,
          getPokemonIQ: action.payload.pokemonIQ
        }
      }
    case 'POKE_PROFILE_IQ_DATA_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload.pokemonIQ
      }
    case 'GET_ALL_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
        apiData: { ...state.apiData, getAllUsers: action.payload }
      }
    case 'GET_ALL_USERS_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    default:
      return state
  }
}

export default apiReducer
