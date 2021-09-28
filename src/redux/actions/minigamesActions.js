import {
  UPDATE_MINIGAME_POKETRIVIA_SUCCESS,
  UPDATE_MINIGAME_POKETRIVIA_ERROR,
  UPDATE_MINIGAME_POKEGUESS_SUCCESS,
  UPDATE_MINIGAME_POKEGUESS_ERROR,
  UPDATE_MINIGAME_POKETYPES_SUCCESS,
  UPDATE_MINIGAME_POKETYPES_ERROR
} from 'redux/types/minigamesTypes';

export const updatePokeTriviaResults =
  currentResult =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const triviaObject = getState().firebase.profile.triviaRecord;
    triviaObject.realizedTrivias += 1;
    triviaObject.correctAnswers += currentResult.correctAnswers;
    triviaObject.wrongAnswers += currentResult.wrongAnswers;

    var pokemon, pokemonNumber;
    let allAnswers = triviaObject.correctAnswers + triviaObject.wrongAnswers;
    let averageCorrectAnswers = triviaObject.correctAnswers / allAnswers;
    averageCorrectAnswers *= 100;
    averageCorrectAnswers = parseInt(averageCorrectAnswers);

    if (isNaN(averageCorrectAnswers)) {
      pokemon = null;
      pokemonNumber = null;
    } else if (averageCorrectAnswers >= 90) {
      pokemon = 'Alakazam';
      pokemonNumber = '65';
    } else if (averageCorrectAnswers >= 75) {
      pokemon = 'Metagross';
      pokemonNumber = '376';
    } else if (averageCorrectAnswers >= 50) {
      pokemon = 'Beheeyem';
      pokemonNumber = '606';
    } else if (averageCorrectAnswers >= 25) {
      pokemon = 'Quagsire';
      pokemonNumber = '195';
    } else if (averageCorrectAnswers >= 10) {
      pokemon = 'Slowpoke';
      pokemonNumber = '79';
    } else {
      pokemon = 'Magikarp';
      pokemonNumber = '129';
    }

    try {
      await firestore
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
        });
      dispatch({ type: UPDATE_MINIGAME_POKETRIVIA_SUCCESS });
    } catch (err) {
      dispatch({ type: UPDATE_MINIGAME_POKETRIVIA_ERROR, error: err.message });
    }
  };

export const updatePokeGuessResults =
  () =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch({ type: UPDATE_MINIGAME_POKEGUESS_SUCCESS });
    } catch (err) {
      dispatch({ type: UPDATE_MINIGAME_POKEGUESS_ERROR, error: err.message });
    }
  };

export const updatePokeTypesResults =
  () =>
  async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch({ type: UPDATE_MINIGAME_POKETYPES_SUCCESS });
    } catch (err) {
      dispatch({ type: UPDATE_MINIGAME_POKETYPES_ERROR, error: err.message });
    }
  };
