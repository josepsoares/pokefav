const initState = {
    actionError: null,
    actionFavoritesFeedback: null
}

const favoriteReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REMOVE_FAVORITE_TEAM_FEEDBACK':
            return {
                ...state,
                actionFavoritesFeedback: null
            }
        case 'ADD_FAVORITE_SUCCESS':
            return {
                ...state,
                actionFavoritesFeedback: ['Pokémon added successfully to Favorite Pokémon List', 'success']
            }
        case 'ADD_FAVORITE_ERROR':
            return {
                ...state,
                actionError: action.error.message,
                actionFavoritesFeedback: [`Pokémon added unsuccessfully to Favorite Pokémon List - ${action.error.message}`, 'error']
            }
        case 'REMOVE_FAVORITE_SUCCESS':
            return {
                ...state,
                actionFavoritesFeedback: ['Pokémon removed successfully from Favorite Pokémon List', 'success']
            }
        case 'REMOVE_FAVORITE_ERROR':
            return {
                ...state,
                actionError: action.error.message,
                actionFavoritesFeedback: [`Pokémon removed unsuccessfully from Favorite Pokémon List - ${action.error.message}`, 'error']
            }
        case 'ADD_POKEMON_TEAM_SUCCESS':
            return {
                ...state,
                actionFavoritesFeedback: ['Pokémon added successfully to Favorite Pokémon Team', 'success']
            }
        case 'ADD_POKEMON_TEAM_ERROR':
            return {
                ...state,
                actionError: action.error.message,
                actionFavoritesFeedback: [`Pokémon added unsuccessfully to Favorite Pokémon Team - ${action.error.message}`, 'error']
            }
        case 'REMOVE_POKEMON_TEAM_SUCCESS':
            return {
                ...state,
                actionFavoritesFeedback: ['Pokémon removed successfully from Favorite Pokémon Team', 'success']
            }
        case 'REMOVE_POKEMON_TEAM_ERROR':
            return {
                ...state,
                actionError: action.error.message,
                actionFavoritesFeedback: [`Pokémon removed unsuccessfully from Favorite Pokémon Team - ${action.error.message}`, 'error']
            }
        default:
            return state
    }
}

export default favoriteReducer;