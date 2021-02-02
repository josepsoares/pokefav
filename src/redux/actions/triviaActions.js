export const addTriviaResult = currentResult => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore()
    const uid = getState().firebase.auth.uid
    const triviaObject = getState().firebase.profile.triviaRecord
    triviaObject.realizedTrivias += 1
    triviaObject.correctAnswers += currentResult.correctAnswers
    triviaObject.wrongAnswers += currentResult.wrongAnswers

    var pokemon, pokemonNumber
    let allAnswers = triviaObject.correctAnswers + triviaObject.wrongAnswers
    let averageCorrectAnswers = triviaObject.correctAnswers / allAnswers
    averageCorrectAnswers *= 100
    averageCorrectAnswers = parseInt(averageCorrectAnswers)

    if (isNaN(averageCorrectAnswers)) {
      pokemon = null
      pokemonNumber = null
    } else if (averageCorrectAnswers >= 90) {
      pokemon = 'Alakazam'
      pokemonNumber = '65'
    } else if (averageCorrectAnswers >= 75) {
      pokemon = 'Metagross'
      pokemonNumber = '376'
    } else if (averageCorrectAnswers >= 50) {
      pokemon = 'Beheeyem'
      pokemonNumber = '606'
    } else if (averageCorrectAnswers >= 25) {
      pokemon = 'Quagsire'
      pokemonNumber = '195'
    } else if (averageCorrectAnswers >= 10) {
      pokemon = 'Slowpoke'
      pokemonNumber = '79'
    } else {
      pokemon = 'Magikarp'
      pokemonNumber = '129'
    }

    firestore
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then(() => {
        return firestore
          .collection('users')
          .doc(uid)
          .update({
            triviaRecord: {
              pokemonIQ: pokemon,
              pokemonIQNumber: pokemonNumber,
              realizedTrivias: triviaObject.realizedTrivias,
              correctAnswers: triviaObject.correctAnswers,
              wrongAnswers: triviaObject.wrongAnswers
            }
          })
      })
      .then(() => {
        dispatch({ type: 'ADD_TRIVIA_SUCCESS' })
      })
      .catch(() => {
        dispatch({ type: 'ADD_TRIVIA_ERROR' })
      })
  }
}
