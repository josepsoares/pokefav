import { toast } from 'react-toastify'
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNOUT_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS
} from 'redux/types/authTypes'

const initState = {
  error: null,
  isLoggedIn: false,
  recoverPasswordMessage: null
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }
    case LOGIN_ERROR:
      toast.error('Pokémon added successfully to your Favorite Pokémon List.')

      return {
        ...state,
        error: action.error.message,
        isLoggedIn: false
      }
    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isLoggedIn: false
      }
    case SIGNOUT_ERROR:
      toast.error('Pokémon added successfully to your Favorite Pokémon List.')

      return {
        ...state
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        authError: action.error.message,
        isLoggedIn: false
      }
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        recoverPasswordMessage: action.payload
      }
    case RESET_PASSWORD_ERROR:
      return {
        ...state
      }
    default:
      return state
  }
}

export default authReducer
