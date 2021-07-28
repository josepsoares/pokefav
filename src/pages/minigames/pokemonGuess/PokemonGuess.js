import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { trivia } from 'assets/content/quizz'
import { addTriviaResult } from 'redux/actions/triviaActions'
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
  Text
} from '@chakra-ui/react'
import { CgPokemon } from 'react-icons/cg'
import { FaQuestion, FaSignInAlt } from 'react-icons/fa'
import _ from 'lodash'

import Button from 'components/layout/Button'
import Loading from 'components/feedback/Loading'
import ConfirmationLeave from 'components/feedback/ConfirmationLeave'
import SEO from 'components/Seo'
import Error from 'components/feedback/Error'
import PokemonGuessStatic from 'pages/minigames/pokemonGuess/components/PokemonGuessStatic'
import PokemonGuessResults from 'pages/minigames/pokemonGuess/components/PokemonGuessResults'

const PokemonGuess = () => {
  const initState = {
    isGameReadyToStart: false,
    isOnGame: false,
    time: null,
    didFinishGame: false,
    difficulties: ['normal', 'hard'],
    pickedDifficulty: null,
    pickedPokemons: null,
    allPokemon: null,
    currentPokemon: null,
    previousPokemons: null,
    nrOfGuessedPokemons: 0,
    totalCorrectGuesses: 0,
    totalIncorrectGuesses: 0,
    showFeedback: false,
    feedbackType: null
  }

  const [state, setState] = useState(initState)
  const [confirmModal, setConfirmModal] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch()
  const profileContent = useSelector(state => state.firebase.profile)
  const updateTriviaResultError = useSelector(
    state => state.trivia.updateTriviaResultError
  )

  const startPokeGuess = (difficulty, pokemonSample) => {
    const startInitState = initState
    startInitState.isOnGame = true
    setState(startInitState)
  }

  const restartPokeGuess = () => {
    setState(initState)
  }

  const printLettersForGuess = pokemonName => {}

  const handleGuess = guess => {
    const isGuessCorrect = guess === state.currentPokemon.name

    setState({
      ...state,
      showFeedback: true,
      feedbackType: isGuessCorrect,
      previousPokemon: '',
      totalCorrectGuesses: isGuessCorrect
        ? _.add(state.totalCorrectGuesses, 1)
        : state.totalCorrectGuesses,
      totalIncorrectGuesses: !isGuessCorrect
        ? _.add(state.totalIncorrectGuesses, 1)
        : state.totalIncorrectGuesses
    })

    setTimeout(() => {
      var changeNrGuesses = state.questionNumber + 1

      const getNextPokemon = ''

      setState({
        ...state,
        currentPokemon: getNextPokemon,
        nrOfGuessedPokemons: changeNrGuesses,
        showFeedback: false
      })
    }, 3000)
  }

  useEffect(() => {}, [])

  const {
    isOnGame,
    isGameReadyToStart,
    didFinishGame,
    currentQuestion,
    allGameQuestions,
    numberOfQuestions,
    questionNumber,
    currentAnswers,
    totalCorrectGuesses,
    totalIncorrectGuesses,
    showAnswersFeedback
  } = state

  const changeColorCorrect = showAnswersFeedback ? 'green' : 'none'
  const changeColorWrong = showAnswersFeedback ? 'red' : 'none'
  const disabledBtn = showAnswersFeedback

  console.log(state)
  if (updateTriviaResultError) {
    return (
      <Error error="An error occurred while updating your trivia stats. Please try playing again PokéTrivia later." />
    )
  } else if (!isOnGame) {
    return (
      <PokemonGuessStatic
        startTrivia={(difficulty, pokemonSample) =>
          startPokeGuess(difficulty, pokemonSample)
        }
      />
    )
  } else {
    if (!isGameReadyToStart) {
      return <Loading />
    } else {
      if (isGameReadyToStart && !didFinishGame) {
        return (
          <>
            <SEO
              title={`PokéGuess`}
              description="Play a fun trivia filled with challeging questions about facts and mechanics about Pokémon Franchise"
            />
            <Flex
              textAlign="center"
              flexDir="column"
              align="center"
              justify="center"
            >
              <Flex gridGap={4} pb={14} flexDir="row" align="center">
                {allGameQuestions.map((item, index) => {
                  const iconColor =
                    item.didAnswerCorrect === null
                      ? '#ebebd3'
                      : item.didAnswerCorrect
                      ? '#38a169'
                      : '#f24643'

                  return (
                    <React.Fragment key={index}>
                      <Icon
                        transition="all 0.5s ease-in-out"
                        boxSize={questionNumber === index ? 8 : 4}
                        color={iconColor}
                        as={CgPokemon}
                      />
                      <Divider />
                    </React.Fragment>
                  )
                })}
              </Flex>

              <Heading as="h1" pb={4}>
                Who is this pokémon?
              </Heading>
              <SimpleGrid
                w={['100%', null, null, '90%']}
                justifyItems="center"
                gridGap={8}
                columns={[1, null, 2]}
              >
                <Box order={[2, null, null, 1]}>
                  <Text pb={8}>
                    Are you an intellectual like Alakazam or Metagross or are
                    you as oblivious as Slowpoke or Magikarp? Check out your
                    profile when you're done to find out what pokémon are you!
                  </Text>
                </Box>
                <Flex
                  justify="center"
                  align="center"
                  order={[1, null, null, 2]}
                >
                  <Image
                    maxH="400px"
                    maxW="400px"
                    objectFit="contain"
                    objectPosition="center"
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/065_f2.png"
                    alt="Alakazam"
                    filter="brightness(0%)"
                  />
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
                  setConfirmModal(false)
                }}
                proceedFunc={() => {
                  setConfirmModal(false)
                  restartPokeGuess()
                }}
                title="Abandon PokéGuess?"
                description="Are you sure you want to abandon your session of PokéGuess? You'll lose all the progress you made in this session"
                when={isOnGame && !didFinishGame}
                shouldBlockNavigation={isOnGame && !didFinishGame}
              />
            </Flex>
          </>
        )
      } else {
        return (
          <PokemonGuessResults
            guesses={{
              correct: totalCorrectGuesses,
              incorrect: totalIncorrectGuesses
            }}
            numberOfQuestions={numberOfQuestions}
            startFunc={startPokeGuess}
            restartFunc={restartPokeGuess}
            userProfile={profileContent}
          />
        )
      }
    }
  }
}

export default PokemonGuess
