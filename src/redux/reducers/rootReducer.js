import userReducer from './userReducer'
import userFavoritesReducer from './userFavoritesReducer'
import triviaReducer from './triviaReducer'
import notificationsReducer from './notificationsReducer'
import apiReducer from './apiReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const apiPersistConfig = {
  key: 'apiCalls',
  storage: storage,
  whitelist: ['apiData']
}

const rootReducer = combineReducers({
  auth: userReducer,
  favorite: userFavoritesReducer,
  trivia: triviaReducer,
  notifications: notificationsReducer,
  apiCalls: persistReducer(apiPersistConfig, apiReducer),
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
