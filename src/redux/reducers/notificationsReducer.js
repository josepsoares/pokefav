import {
  GET_NOTIFICATIONS_LOADING,
  GET_NOTIFICATIONS_SUCCESS,
  GET_NOTIFICATIONS_ERROR,
  REACTION_NOTIFICATION_LOADING,
  LIKE_NOTIFICATION_SUCCESS,
  LIKE_NOTIFICATION_ERROR,
  DISLIKE_NOTIFICATION_SUCCESS,
  DISLIKE_NOTIFICATION_ERROR
} from 'redux/types/notificationsTypes';

const initState = {
  notifications: '',
  notificationsError: false,
  isLoadingNotifs: false,
  isLoadingReaction: false,
  reactionError: false
};

const notificationsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CLEAN_ERRORS':
      return {
        ...state,
        notificationsError: false,
        reactionError: false
      };
    case GET_NOTIFICATIONS_LOADING:
      return {
        ...state,
        isLoadingNotifs: true
      };
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
        isLoadingNotifs: false
      };
    case GET_NOTIFICATIONS_ERROR:
      return {
        ...state,
        notificationsError: action.payload,
        isLoadingNotifs: false
      };
    case REACTION_NOTIFICATION_LOADING:
      return {
        ...state,
        isLoadingReaction: true
      };
    case LIKE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoadingReaction: false
      };
    case LIKE_NOTIFICATION_ERROR:
      return {
        ...state,
        isLoadingReaction: false
      };
    case DISLIKE_NOTIFICATION_SUCCESS:
      return {
        ...state,
        isLoadingReaction: false
      };
    case DISLIKE_NOTIFICATION_ERROR:
      return {
        ...state,
        isLoadingReaction: false
      };
    default:
      return state;
  }
};

export default notificationsReducer;
