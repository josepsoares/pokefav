import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
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
  ModalOverlay,
  Image,
  Box,
  Text,
  Input
} from '@chakra-ui/react';
import { CgPokemon } from 'react-icons/cg';
import { FaQuestion, FaSignInAlt } from 'react-icons/fa';
import _ from 'lodash';
import moment from 'moment';

import SEO from 'components/Seo';
import Button from 'components/layout/Button';
import Error from 'components/feedback/Error';
import Loading from 'components/feedback/Loading';
import ConfirmationLeave from 'components/feedback/ConfirmationLeave';
import PokemonGuessStatic from 'pages/minigames/pokemonGuess/components/PokemonGuessStatic';
import PokemonGuessResults from 'pages/minigames/pokemonGuess/components/PokemonGuessResults';

const generateRandomPokemonNr = () => {};

const calculateTimeLeft = () => {
  const getDate = new Date();
  let difference = moment(getDate).add(5, 'm').toDate() - getDate;
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  return timeLeft;
};

const PokemonGuess = () => {
  const initState = {
    isOnGame: false,
    isGameReadyToStart: false,
    didFinishGame: false,
    allPokemon: null,
    currentPokemon: null,
    previousPokemons: null,
    nrOfGuessedPokemons: 0,
    guessNumber: 0,
    correctGuesses: 0,
    incorrectGuesses: 0,
    showFeedback: false,
    feedbackType: null
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timer, setTimer] = useState(1);
  const [confirmModal, setConfirmModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [state, setState] = useState(initState);
  const {
    isOnGame,
    isGameReadyToStart,
    didFinishGame,
    currentPokemon,
    nrOfGuessedPokemons,
    guessNumber,
    totalCorrectGuesses,
    totalIncorrectGuesses,
    showFeedback,
    feedbackType
  } = state;

  const dispatch = useDispatch();
  const profileContent = useSelector(state => state.firebase.profile);
  const updateTriviaResultError = useSelector(
    state => state.minigames.updateTriviaResultError
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (timeLeft === 0) {
      clearTimeout(timer);
    }

    return () => clearTimeout(timer);
  });

  const startMinigame = async () => {
    try {
      const getPokemons = await fetch(
        'https://pokeapi.co/api/v2/pokedex/national/'
      );
      const getPokemonsData = await getPokemons.json();

      setState({
        ...state,
        currentPokemon: null,
        pickedPokemons: getPokemonsData.length,
        allPokemon: getPokemonsData
      });
    } catch (err) {
      return err.message;
    }

    setState({
      ...state,
      isOnGame: true
    });
  };

  const restartMinigame = () => {
    setState(initState);
    setTimer(1);
  };

  const handleGuess = guess => {
    const isGuessCorrect = guess === state.currentPokemon.name;

    setState({
      ...state,
      showFeedback: true,
      feedbackType: isGuessCorrect,
      totalCorrectGuesses: isGuessCorrect
        ? _.add(state.totalCorrectGuesses, 1)
        : state.totalCorrectGuesses,
      totalIncorrectGuesses: !isGuessCorrect
        ? _.add(state.totalIncorrectGuesses, 1)
        : state.totalIncorrectGuesses
    });

    setTimeout(() => {
      var changeNrGuesses = state.questionNumber + 1;

      const getNextPokemon = '';

      setState({
        ...state,
        currentPokemon: getNextPokemon,
        nrOfGuessedPokemons: changeNrGuesses,
        showFeedback: false
      });
    }, 3000);
  };

  const getSimularPokemonsOfInputText = event => {
    const { value } = event.target;
  };

  if (updateTriviaResultError) {
    return (
      <Error error="An error occurred while updating your trivia stats. Please try playing again PokéTrivia later." />
    );
  } else if (!isOnGame) {
    return (
      <PokemonGuessStatic
        startTrivia={(difficulty, pokemonSample) =>
          startMinigame(difficulty, pokemonSample)
        }
      />
    );
  } else if (!isGameReadyToStart) {
    return <Loading />;
  } else if (isGameReadyToStart && !didFinishGame) {
    return (
      <>
        <SEO
          title="PokéGuess"
          description="Play a fun trivia filled with challeging questions about facts and mechanics about Pokémon Franchise"
        />
        <Flex
          textAlign="center"
          flexDir="column"
          align="center"
          justify="center"
        >
          <Flex gridGap={4} pb={14} flexDir="row" align="center">
            {/* parte de cima que vai ter pokebolas a representar nr de guesses do user */}
            {nrOfGuessedPokemons.map((item, index) => {
              const iconColor =
                item.didGuessCorrect === null
                  ? '#ebebd3'
                  : item.didGuessCorrect
                  ? '#38a169'
                  : '#f24643';

              return (
                <React.Fragment key={index}>
                  <Icon
                    transition="all 0.5s ease-in-out"
                    boxSize={guessNumber === index ? 8 : 4}
                    color={iconColor}
                    as={CgPokemon}
                  />
                  <Divider />
                </React.Fragment>
              );
            })}
          </Flex>

          <SimpleGrid
            w={['100%', null, null, '90%']}
            justifyItems="center"
            gridGap={8}
            columns={[1, null, 2]}
          >
            <Box order={[2, null, null, 1]}>
              <Heading as="h3">Remaining time:</Heading>
              <Heading as="h1" pb={4}>
                Who is this Pokémon?
              </Heading>

              <Text>Make your guess!</Text>
              <Input
                onChange={getSimularPokemonsOfInputText}
                pb={8}
                placeholder="write down your guess"
              />
            </Box>
            <Flex justify="center" align="center" order={[1, null, null, 2]}>
              <Image
                maxH="400px"
                maxW="400px"
                objectFit="contain"
                objectPosition="center"
                alt="Mysterious pokémon"
                filter="brightness(0%)"
              />
              <Text></Text>
            </Flex>
          </SimpleGrid>
          <Flex
            pt={16}
            w="100%"
            gridGap={6}
            justify="flex-start"
            align="center"
            flexWrap="wrap"
          >
            <Button
              p={3}
              minH={4}
              variant="ghost"
              onClick={onOpen}
              fontWeight="normal"
              leftIcon={<Icon as={FaQuestion} />}
            >
              Help
            </Button>
            <Button
              p={3}
              minH={4}
              variant="ghost"
              fontWeight="normal"
              onClick={() => setConfirmModal(true)}
              rightIcon={<Icon as={FaSignInAlt} />}
            >
              Give up
            </Button>
          </Flex>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Help</ModalHeader>
              <ModalCloseButton />
              <ModalBody></ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <ConfirmationLeave
            didOpen={confirmModal}
            closeFunc={() => {
              setConfirmModal(false);
            }}
            proceedFunc={() => {
              setConfirmModal(false);
              restartMinigame();
            }}
            title="Abandon PokéGuess?"
            description="Are you sure you want to abandon your session of PokéGuess? You'll lose all the progress you made in this session"
            when={isOnGame && !didFinishGame}
            shouldBlockNavigation={isOnGame && !didFinishGame}
          />
        </Flex>
      </>
    );
  } else {
    return (
      <PokemonGuessResults
        guesses={{
          correct: totalCorrectGuesses,
          incorrect: totalIncorrectGuesses
        }}
        numberOfQuestions={nrOfGuessedPokemons}
        startFunc={startMinigame}
        restartFunc={restartMinigame}
        userProfile={profileContent}
      />
    );
  }
};

export default PokemonGuess;
