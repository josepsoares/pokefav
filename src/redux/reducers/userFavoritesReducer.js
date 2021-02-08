import { toast } from 'react-toastify'

const initState = {
  actionError: null
}

const userFavoritesReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_FAVORITE_SUCCESS':
      toast.success('Pokémon added successfully to your Favorite Pokémon List.')

      return {
        ...state
      }
    case 'ADD_FAVORITE_ERROR':
      toast.error(
        'An error occurred while adding this Pokémon to your Favorite Pokémon List.\nPlease try again later'
      )

      return {
        ...state,
        actionError: action.error
      }
    case 'REMOVE_FAVORITE_SUCCESS':
      toast.success(
        'Pokémon removed successfully from your Favorite Pokémon List!'
      )
      return {
        ...state
      }
    case 'REMOVE_FAVORITE_ERROR':
      toast.error(
        'An error occurred while removing this Pokémon from your Favorite Pokémon List.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    case 'ADD_POKEMON_TEAM_SUCCESS':
      toast.success('Pokémon added successfully to your Pokémon Team!')
      return {
        ...state
      }
    case 'ADD_POKEMON_TEAM_ERROR':
      toast.error(
        'An error occurred while adding this Pokémon to your Pokémon Team.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    case 'REMOVE_POKEMON_TEAM_SUCCESS':
      toast.success('Pokémon removed successfully from your Pokemon Team!')
      return {
        ...state
      }
    case 'REMOVE_POKEMON_TEAM_ERROR':
      toast.error(
        'An error occurred while removing this Pokémon from your Pokémon Team.\nPlease try again later'
      )
      return {
        ...state,
        actionError: action.error
      }
    default:
      return state
  }
}

export default userFavoritesReducer
