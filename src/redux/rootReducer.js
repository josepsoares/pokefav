import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import minigamesReducer from './reducers/minigamesReducer';
import notificationsReducer from './reducers/notificationsReducer';
import pokemonReducer from 'redux/reducers/pokemonReducer';
import pokemonCardsReducer from 'redux/reducers/pokemonCardsReducer';

const userApiPersistConfig = {
  key: 'user',
  storage: storage,
  whitelist: ['isLoggedIn', 'queryUser']
};

const pokemonApiPersistConfig = {
  key: 'pokemonApi',
  storage: storage,
  whitelist: ['data']
};

const pokemonCardsApiPersistConfig = {
  key: 'pokemonCardsApi',
  storage: storage,
  whitelist: ['cardsData', 'page', 'rarities']
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: persistReducer(userApiPersistConfig, userReducer),
  minigames: minigamesReducer,
  notifications: notificationsReducer,
  pokemonCardsApi: persistReducer(
    pokemonCardsApiPersistConfig,
    pokemonCardsReducer
  ),
  pokemonApi: persistReducer(pokemonApiPersistConfig, pokemonReducer),
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;
