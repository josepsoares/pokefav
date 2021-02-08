import moment from 'moment'

export const signIn = credentials => {
  return async (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase()
    const signInType = credentials.rememberMe
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION

    try {
      await firebase.auth().setPersistence(signInType)

      await firebase
        .auth()
        .signInWithEmailAndPassword(credentials.email, credentials.password)
      dispatch({ type: 'LOGIN_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'LOGIN_ERROR' })
    }
  }
}

export const signUp = newUser => {
  return (dispatch, _, { getFirebase, getFirestore }) => {
    const firebase = getFirebase()
    const firestore = getFirestore()
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then(response => {
        return firestore
          .collection('users')
          .doc(response.user.uid)
          .set({
            createdAt: moment().format('Do MMMM YYYY'),
            email: newUser.email,
            username: newUser.username,
            gender: newUser.gender,
            nationality: newUser.nationality,
            avatar: newUser.avatar,
            favoriteGame: newUser.favoriteGame,
            favoriteRegion: newUser.favoriteRegion,
            friends: [],
            favoriteTeam: [],
            favoritePokemons: [],
            triviaRecord: {
              pokemonIQ: null,
              realizedTrivias: 0,
              correctAnswers: 0,
              wrongAnswers: 0
            },
            notificationLikes: [],
            addFavoriteAction: null
          })
      })
      .then(() => {
        dispatch({ type: 'SIGNUP_SUCCESS' })
      })
      .catch(error => {
        dispatch({ type: 'SIGNUP_ERROR', error: error })
      })
  }
}

export const signOut = () => {
  return async (dispatch, _, { getFirebase }) => {
    try {
      const firebase = getFirebase()
      await firebase.auth().signOut()
      firebase.logout()
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'SIGNOUT_ERROR' })
    }
  }
}

export const recoverPassword = email => {
  return async (dispatch, _, { getFirebase }) => {
    const firebase = getFirebase()

    try {
      await firebase.auth().sendPasswordResetEmail(email)

      dispatch({
        type: 'RESET_PASSWORD_SUCCESS',
        payload: 'Reset password email sent. Go check your inbox.'
      })
    } catch (error) {
      dispatch({
        type: 'RESET_PASSWORD_ERROR',
        payload: error.message
      })
    }
  }
}

export const editProfileField = (field, value) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid

    try {
      await firestore
        .collection('users')
        .doc(uid)
        .update({
          [field]: value
        })
      dispatch({ type: 'CHANGE_PROFILE_SUCCESS', payload: field })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'CHANGE_PROFILE_ERROR', payload: field })
    }
  }
}

export const getUser = user => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    dispatch({ type: 'API_REQUEST_START' })
    const firestore = getFirestore()
    let userInfo

    console.log(user)

    try {
      const queryUser = await firestore
        .collection('users')
        .where('username', '==', user)
        .get()

      queryUser.forEach(doc => {
        if (doc.exists) {
          userInfo = doc.data()
        } else {
          throw Error
        }
      })

      dispatch({
        type: 'GET_USER_SUCCESS',
        payload: userInfo
      })
      dispatch({ type: 'API_REQUEST_END' })
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'GET_USER_ERROR',
        payload: err.error
      })
      dispatch({ type: 'API_REQUEST_END' })
    }
  }
}
