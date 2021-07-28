import _ from 'lodash/array'
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

export const getUser = user => {
  return async (dispatch, _, { getFirestore }) => {
    dispatch({ type: 'API_REQUEST_START' })
    const firestore = getFirestore()
    let userInfo

    try {
      const queryUser = await firestore
        .collection('users')
        .where('username', '==', user)
        .get()

      queryUser.forEach(doc => {
        if (doc.exists) {
          userInfo = doc.data()
        } else {
          throw Error
        }
      })

      dispatch({
        type: GET_USER_SUCCESS,
        payload: userInfo
      })
      dispatch({ type: 'API_REQUEST_END' })
    } catch (err) {
      dispatch({
        type: GET_USER_ERROR,
        payload: err.error
      })
      dispatch({ type: 'API_REQUEST_END' })
    }
  }
}

export const editProfileField = (field, value) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid

    try {
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          [field]: value
        })
      dispatch({ type: CHANGE_PROFILE_SUCCESS, payload: field })
    } catch (err) {
      dispatch({ type: CHANGE_PROFILE_ERROR, payload: field })
    }
  }
}

export const addFavoritePokemon = favorite => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid
    const profileFavoritePokemons = getState().firebase.profile.favoritePokemons

    try {
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          addFavoriteAction: true,
          favoritePokemons: profileFavoritePokemons.concat({
            name: favorite[0],
            editedName: favorite[1],
            stats: favorite[2],
            id: favorite[3]
          })
        })

      dispatch({ type: ADD_FAVORITE_SUCCESS })
    } catch (err) {
      dispatch({ type: ADD_FAVORITE_ERROR, error: err.message })
    }
  }
}

export const removeFavoritePokemon = favorite => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid
    const profileFavoritePokemons = getState().firebase.profile.favoritePokemons

    try {
      _.remove(profileFavoritePokemons, item => {
        return item.name === favorite
      })
      await firestore.collection('users').doc(uid).update({
        addFavoriteAction: false,
        favoritePokemons: profileFavoritePokemons
      })
      dispatch({ type: REMOVE_FAVORITE_SUCCESS })
    } catch (err) {
      dispatch({ type: REMOVE_FAVORITE_ERROR, error: err.message })
    }
  }
}

export const updateFavoritePokeList = updatedPokeFavList => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid

    try {
      await firestore.collection('users').doc(uid).update({
        addFavoriteAction: false,
        favoritePokemons: updatedPokeFavList
      })
      dispatch({ type: UPDATE_FAVORITE_SUCCESS })
    } catch (err) {
      dispatch({ type: UPDATE_FAVORITE_ERROR, error: err.message })
    }
  }
}

export const addPokemonToTeam = pokemon => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid
    const profileTeamPokemons = getState().firebase.profile.favoriteTeam

    try {
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          addFavoriteAction: true,
          favoriteTeam: profileTeamPokemons.concat({
            name: pokemon[0],
            editedName: pokemon[1],
            stats: pokemon[2],
            id: pokemon[3]
          })
        })
      dispatch({ type: ADD_POKEMON_TEAM_SUCCESS })
    } catch (err) {
      dispatch({ type: ADD_POKEMON_TEAM_ERROR, error: err.message })
    }
  }
}

export const removePokemonFromTeam = pokemon => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid
    const profileTeamPokemons = getState().firebase.profile.favoriteTeam

    try {
      _.remove(profileTeamPokemons, item => {
        return item.name === pokemon
      })

      await firestore.collection('users').doc(uid).update({
        addFavoriteAction: false,
        favoriteTeam: profileTeamPokemons
      })
      dispatch({ type: REMOVE_POKEMON_TEAM_SUCCESS })
    } catch (err) {
      dispatch({ type: REMOVE_POKEMON_TEAM_ERROR, error: err.message })
    }
  }
}

export const updatePokeTeamList = updatedPokeTeam => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid

    try {
      await firestore.collection('users').doc(uid).update({
        addFavoriteAction: false,
        favoriteTeam: updatedPokeTeam
      })
      dispatch({ type: UPDATE_POKEMON_TEAM_SUCCESS })
    } catch (err) {
      dispatch({ type: UPDATE_POKEMON_TEAM_ERROR, error: err.message })
    }
  }
}
