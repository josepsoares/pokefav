const initState = {
    friendData: '',
    allUsers: '',
    actionFriendError: null,
    actionFriendsFeedback: null
}

const friendsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'REMOVE_FRIEND_FEEDBACK':
            return {
                ...state,
                actionFriendsFeedback: null
            }
        case 'ADD_FRIEND_SUCCESS':
            return {
                ...state,
                actionFriendsFeedback: ['User added to Following List successfully', 'success']
            }
        case 'ADD_FRIEND_ERROR':
            return {
                ...state,
                actionFriendError: action.error.message,
                actionFriendsFeedback: [`User added to Following List unsuccessfully, - ${action.error.message}`, 'error'],
            }
        case 'REMOVE_FRIEND_SUCCESS':
            return {
                ...state,
                actionFriendsFeedback: ['Follower removed from Following List successfully', 'success']
            }
        case 'REMOVE_FRIEND_ERROR':
            return {
                ...state,
                actionFriendError: action.error.message,
                actionFriendsFeedback: [`Follower removed from Following List unsuccessfully, - ${action.error.message}`, 'error'],
            }
        case 'GET_FRIEND_SUCCESS':
            return {
                ...state,
                friendData: action.payload
            }
        case 'GET_FRIEND_ERROR':
            return {
                ...state,
                friendData: action.error
            }
        default:
            return state
    }
}

export default friendsReducer;