const initState = {
    notifications: '',
    isLoaded: false,
    actionReactionFeedback: null,
    isReactionLoading: false
}

const notificationsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REMOVE_REACTION_FEEDBACK':
            return {
                ...state,
                actionReactionFeedback: null
            }
        case 'LIKE_REQUEST_START':
            return {
                ...state,
                isReactionLoading: true
            }
        case 'GET_NOTIFICATIONS_SUCCESS':
            return {
                ...state,
                notifications: action.payload,
                isLoaded: true
            }
        case 'GET_NOTIFICATIONS_ERROR':
            return {
                ...state,
                notifications: action.payload,
                isLoaded: true
            }
        case 'LIKE_NOTIFICATION_SUCCESS':
            return {
                ...state,
                actionReactionFeedback: ['Reaction added successfully to the database!', 'success'],
                isReactionLoading: false
            }
        case 'LIKE_NOTIFICATION_ERROR':
            return {
                ...state,
                actionReactionFeedback: ['Ops, we were not able to save your reaction in the database!', 'error'],
                isReactionLoading: false
            }
        case 'DISLIKE_NOTIFICATION_SUCCESS':
            return {
                ...state,
                actionReactionFeedback: ['Reaction removed successfully from the database!', 'success'],
                isReactionLoading: false
            }
        case 'DISLIKE_NOTIFICATION_ERROR':
            return {
                ...state,
                actionReactionFeedback: ['Ops, we were not able to remove your reaction in the database!', 'error'],
                isReactionLoading: false
            }
        default:
            return state
    }
}

export default notificationsReducer;