import { toast } from 'react-toastify'
import {
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  CHANGE_PROFILE_SUCCESS,
  CHANGE_PROFILE_ERROR,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_ERROR,
  REMOVE_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_ERROR,
  UPDATE_FAVORITE_SUCCESS,
  UPDATE_FAVORITE_ERROR,
  ADD_POKEMON_TEAM_SUCCESS,
  ADD_POKEMON_TEAM_ERROR,
  REMOVE_POKEMON_TEAM_SUCCESS,
  REMOVE_POKEMON_TEAM_ERROR,
  UPDATE_POKEMON_TEAM_SUCCESS,
  UPDATE_POKEMON_TEAM_ERROR
} from 'redux/types/userTypes'

const initState = {
  error: null,
  isLoggedIn: false,
  recoverPasswordMessage: null,
  queryUser: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        apiData: { ...state.apiData, queryUser: action.payload }
      }
    case GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        apiData: { ...state.apiData, queryUser: action.payload }
      }
    case CHANGE_PROFILE_SUCCESS:
      if (action.payload === 'avatar') {
        toast.success('Avatar updated successfully!')
      } else if (action.payload === 'favoriteGame') {
        toast.success('Favorite Game updated successfully!')
      } else {
        toast.success('Favorite Region updated successfully!')
      }

      return {
        ...state
      }
    case CHANGE_PROFILE_ERROR:
      if (action.payload === 'avatar') {
        toast.error(
          'An error occurred and we were not able to updated your Avatar. Please try again later'
        )
      } else if (action.payload === 'favoriteGame') {
        toast.error(
          'An error occurred and we were not able to updated your Favorite Game. Please try again later'
        )
      } else {
        // favoriteRegion
        toast.error(
          'An error occurred and we were not able to updated your Favorite Region. Please try again later'
        )
      }

      return {
        ...state
      }
    case ADD_FAVORITE_SUCCESS:
      toast.success('Pokémon added successfully to your Favorite Pokémon List.')

      return {
        ...state
      }
    case ADD_FAVORITE_ERROR:
      toast.error(
        'An error occurred while adding this Pokémon to your Favorite Pokémon List.\nPlease try again later'
      )

      return {
        ...state,
        actionError: action.error
      }
    case REMOVE_FAVORITE_SUCCESS:
      toast.success(
        'Pokémon removed successfully from your Favorite Pokémon List!'
      )
      return {
        ...state
      }
    case REMOVE_FAVORITE_ERROR:
      toast.error(
        'An error occurred while removing this Pokémon from your Favorite Pokémon List.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    case UPDATE_FAVORITE_SUCCESS:
      toast.success('Updated Pokémon Favorite List successfully!')
      return {
        ...state
      }
    case UPDATE_FAVORITE_ERROR:
      toast.error(
        'An error occurred while updating your Favorite Pokémon List.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    case ADD_POKEMON_TEAM_SUCCESS:
      toast.success('Pokémon added successfully to your Pokémon Team!')
      return {
        ...state
      }
    case ADD_POKEMON_TEAM_ERROR:
      toast.error(
        'An error occurred while adding this Pokémon to your Pokémon Team.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    case REMOVE_POKEMON_TEAM_SUCCESS:
      toast.success('Pokémon removed successfully from your Pokemon Team!')
      return {
        ...state
      }
    case REMOVE_POKEMON_TEAM_ERROR:
      toast.error(
        'An error occurred while removing this Pokémon from your Pokémon Team.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    case UPDATE_POKEMON_TEAM_SUCCESS:
      toast.success('Updated Pokémon Team successfully!')
      return {
        ...state
      }
    case UPDATE_POKEMON_TEAM_ERROR:
      toast.error(
        'An error occurred while updating your Pokémon Team.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    default:
      return state
  }
}

export default userReducer
