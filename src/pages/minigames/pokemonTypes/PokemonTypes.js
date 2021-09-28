import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { trivia } from 'assets/content/quizz';
import { updatePokeTriviaResults } from 'redux/actions/minigamesActions';
import {
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Icon,
  Divider,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { CgPokemon } from 'react-icons/cg';
import { FaQuestion, FaSignInAlt } from 'react-icons/fa';
import _ from 'lodash';

import Button from 'components/layout/Button';
import Loading from 'components/feedback/Loading';
import SEO from 'components/Seo';
import Error from 'components/feedback/Error';
import PokemonTypesResults from 'pages/minigames/pokemonTypes/components/PokemonTypesResults';
import PokemonTypesStatic from 'pages/minigames/pokemonTypes/components/PokemonTypesStatic';

const PokemonTypes = () => {
  const initState = {
    isGameReadyToStart: false,
    isOnGame: false,
    didFinishGame: false,
    showFeedback: false
  };

  const [state, setState] = useState(initState);
  const [confirmModal, setConfirmModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const profileContent = useSelector(state => state.firebase.profile);
  const updateTriviaResultError = useSelector(
    state => state.minigames.updateTriviaResultError
  );

  const startMinigame = () => {};

  const restartMinigame = () => {
    setState(initState);
  };

  const printRandomPokemon = () => {};

  const handleDrag = answer => {};

  const {
    isOnGame,
    isGameReadyToStart,
    didFinishGame,
    currentQuestion,
    allGameQuestions,
    numberOfQuestions,
    questionNumber,
    currentAnswers,
    totalCorrectAnswers,
    totalIncorrectAnswers,
    showAnswersFeedback
  } = state;

  const changeColorCorrect = showAnswersFeedback ? 'green' : 'none';
  const changeColorWrong = showAnswersFeedback ? 'red' : 'none';
  const disabledBtn = showAnswersFeedback;

  if (updateTriviaResultError) {
    return (
      <Error error="An error occurred while updating your trivia stats. Please try playing again PokéTrivia later." />
    );
  } else if (!isOnGame) {
    return <PokemonTypesStatic startTrivia={() => startMinigame()} />;
  } else {
    if (!isGameReadyToStart) {
      return <Loading />;
    } else if (isGameReadyToStart && !didFinishGame) {
      return (
        <>
          <SEO
            title={`PokéTypes Q${_.add(questionNumber, 1)}`}
            description="Play a fun trivia filled with challeging questions about facts and mechanics about Pokémon Franchise"
          />
          <Flex>
            <Text>hello</Text>
          </Flex>
        </>
      );
    } else {
      return <PokemonTypesResults />;
    }
  }
};

export default PokemonTypes;
