import { toast } from 'react-toastify'

const initState = {
  error: null,
  isLoggedIn: false,
  recoverPasswordMessage: null,
  queryUser: null
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true
      }
    case 'LOGIN_ERROR':
      toast.error('Pokémon added successfully to your Favorite Pokémon List.')

      return {
        ...state,
        error: action.error.message,
        isLoggedIn: false
      }
    case 'SIGNOUT_SUCCESS':
      return {
        ...state,
        isLoggedIn: false
      }
    case 'SIGNOUT_ERROR':
      toast.error('Pokémon added successfully to your Favorite Pokémon List.')

      return {
        ...state
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        isLoggedIn: true
      }
    case 'SIGNUP_ERROR':
      return {
        ...state,
        authError: action.error.message,
        isLoggedIn: false
      }
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        recoverPasswordMessage: action.payload
      }
    case 'RESET_PASSWORD_ERROR':
      return {
        ...state
      }

    case 'CHANGE_PROFILE_SUCCESS':
      console.log(action.payload, 'olá')
      if (action.payload === 'avatar') {
        toast.success('Avatar updated successfully!')
      } else if (action.payload === 'favoriteGame') {
        toast.success('Favorite Game updated successfully!')
      } else {
        // favoriteRegion
        toast.success('Favorite Region updated successfully!')
      }

      return {
        ...state
      }
    case 'CHANGE_PROFILE_ERROR':
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
    default:
      return state
  }
}

export default userReducer
