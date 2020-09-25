var array = require('lodash/array')

export const addFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileFavoritePokemons = getState().firebase.profile.favoritePokemons;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: true,
                    favoritePokemons: profileFavoritePokemons.concat({
                        name: favorite[0],
                        editedName: favorite[1],
                        stats: favorite[2],
                        id: favorite[3]
                    })
                });
            }).then(() => {
                dispatch({ type: 'ADD_FAVORITE_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_FAVORITE_ERROR' })
            })
    }
}

export const removeFavoritePokemon = (favorite) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileFavoritePokemons = getState().firebase.profile.favoritePokemons;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                array.remove(profileFavoritePokemons, (item) => {
                    return item.editedName === favorite;
                });
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: false,
                    favoritePokemons: profileFavoritePokemons
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_FAVORITE_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_FAVORITE_ERROR' })
            })
    }
}

export const addPokemonToTeam = (pokemon) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileTeamPokemons = getState().firebase.profile.favoriteTeam;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: true,
                    favoriteTeam: profileTeamPokemons.concat({
                        name: pokemon[0],
                        editedName: pokemon[1],
                        stats: pokemon[2],
                        id: pokemon[3]
                    })
                });
            }).then(() => {
                dispatch({ type: 'ADD_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'ADD_POKEMON_TEAM_ERROR' })
            })
    }
}

export const removePokemonFromTeam = (pokemon) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const profileTeamPokemons = getState().firebase.profile.favoriteTeam;
        firestore.collection('users').where("uid", "==", uid).get()
            .then(() => {
                array.remove(profileTeamPokemons, (item) => {
                    return item.editedName === pokemon;
                });
                return firestore.collection("users").doc(uid).update({
                    addFavoriteAction: false,
                    favoriteTeam: profileTeamPokemons
                });
            }).then(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_SUCCESS' })
            }).catch(() => {
                dispatch({ type: 'REMOVE_POKEMON_TEAM_ERROR' })
            })
    }
}

export const removeFavoritesNotification = () => {
    return (dispatch) => {
        dispatch({ type: 'REMOVE_FAVORITE_TEAM_FEEDBACK' })
    }
}