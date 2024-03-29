import moment from 'moment';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  SIGNOUT_ERROR,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS
} from 'redux/types/authTypes';

export const signIn = credentials => {
  return async (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();
    const signInType = credentials.rememberMe
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    try {
      await firebase.auth().setPersistence(signInType);

      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password);
      dispatch({ type: LOGIN_SUCCESS });
    } catch (err) {
      dispatch({ type: LOGIN_ERROR });
    }
  };
};

export const signUp = newUser => {
  return (dispatch, _, { getFirebase, getFirestore }) => {
    console.log(newUser);
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(async response => {
        try {
          await firestore
            .collection('users')
            .doc(response.user.uid)
            .set({
              createdAt: moment().format('Do MMMM YYYY'),
              email: newUser.email,
              username: newUser.username,
              avatar: newUser.avatar,
              favoriteGame: newUser.favoriteGame,
              favoriteRegion: newUser.favoriteRegion,
              favoriteTeam: [],
              favoritePokemons: [],
              minigames: {
                overallScore: 0,
                played: 0,
                pokeGuess: {
                  correctGuesses: 0,
                  incorrectGuesses: 0,
                  played: 0,
                  score: 0,
                  streak: 0
                },
                pokeTrivia: {
                  correctAnswers: 0,
                  incorrectAnswers: 0,
                  played: 0,
                  score: 0
                },
                pokeTypes: {
                  avgTime: 0,
                  correctTypesChosen: 0,
                  incorrectTypesChosen: 0,
                  played: 0,
                  score: 0
                },
                pokemonIQ: null,
                pokemonIQNr: null
              },
              notificationLikes: [],
              addFavoriteAction: null
            });
          await firebase.auth().currentUser.sendEmailVerification();
        } catch (e) {
          console.log('error', e);
        }
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch(error => {
        dispatch({ type: SIGNUP_ERROR, error: error });
      });
  };
};

export const signOut = () => {
  return async (dispatch, _, { getFirebase }) => {
    try {
      const firebase = getFirebase();
      await firebase.auth().signOut();
      firebase.logout();
      dispatch({ type: SIGNOUT_SUCCESS });
    } catch (err) {
      dispatch({ type: SIGNOUT_ERROR });
    }
  };
};

export const recoverPassword = email => {
  return async (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().sendPasswordResetEmail(email);

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: 'Reset password email sent. Go check your inbox.'
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: error.message
      });
    }
  };
};
