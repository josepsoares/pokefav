import _ from 'lodash/array'

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

      dispatch({ type: 'ADD_FAVORITE_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ADD_FAVORITE_ERROR', error: err.message })
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
      dispatch({ type: 'REMOVE_FAVORITE_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'REMOVE_FAVORITE_ERROR', error: err.message })
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
      dispatch({ type: 'ADD_POKEMON_TEAM_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'ADD_POKEMON_TEAM_ERROR', error: err.message })
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
      dispatch({ type: 'REMOVE_POKEMON_TEAM_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'REMOVE_POKEMON_TEAM_ERROR', error: err.message })
    }
  }
}
