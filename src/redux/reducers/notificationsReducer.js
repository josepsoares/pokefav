const initState = {
  notifications: '',
  isLoaded: false,
  isReactionLoading: false
}

const notificationsReducer = (state = initState, action) => {
  switch (action.type) {
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
        isReactionLoading: false
      }
    case 'LIKE_NOTIFICATION_ERROR':
      return {
        ...state,
        isReactionLoading: false
      }
    case 'DISLIKE_NOTIFICATION_SUCCESS':
      return {
        ...state,
        isReactionLoading: false
      }
    case 'DISLIKE_NOTIFICATION_ERROR':
      return {
        ...state,
        isReactionLoading: false
      }
    default:
      return state
  }
}

export default notificationsReducer
