import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { trivia } from 'assets/content/quizz'
import { updatePokeTriviaResults } from 'redux/actions/minigamesActions'
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
  ModalOverlay
} from '@chakra-ui/react'
import { CgPokemon } from 'react-icons/cg'
import { FaQuestion, FaSignInAlt } from 'react-icons/fa'
import _ from 'lodash'

import Button from 'components/layout/Button'
import Loading from 'components/feedback/Loading'
import PokemonTriviaStatic from './components/PokemonTriviaStatic'
import PokemonTriviaResults from './components/PokemonTriviaResults'
import ConfirmationLeave from 'components/feedback/ConfirmationLeave'
import SEO from 'components/Seo'
import Error from 'components/feedback/Error'

const PokemonTrivia = () => {
  const initState = {
    isGameReadyToStart: false,
    isOnGame: false,
    didFinishGame: false,
    allQuestions: trivia,
    currentQuestion: '',
    currentQuestionObject: null,
    questionNumber: 0,
    numberOfQuestions: 10,
    allGameQuestions: [],
    // answers things
    allGameAnswers: null,
    currentAnswers: undefined,
    totalCorrectAnswers: 0,
    totalIncorrectAnswers: 0,
    showAnswersFeedback: false
  }

  const [state, setState] = useState(initState)
  const [confirmModal, setConfirmModal] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dispatch = useDispatch()
  const profileContent = useSelector(state => state.firebase.profile)
  const updateTriviaResultError = useSelector(
    state => state.trivia.updateTriviaResultError
  )

  const startTrivia = () => {
    const startInitState = initState
    startInitState.isOnGame = true
    setState(startInitState)

    setTimeout(() => {
      const getQuestions = printQuestionsAnswers(
        'questions',
        state.numberOfQuestions
      )

      console.log(getQuestions)

      const getAnswers = printQuestionsAnswers('answers', 4)
      var answersArray = []

      console.log(getAnswers)

      for (let i = 0; i < getQuestions.length; i++) {
        answersArray.push([])
        for (var x = 0; x < getAnswers.length; x++) {
          if (getAnswers[x] === -1) {
            answersArray[i].push({
              answer: state.allQuestions[getQuestions[i].id].correct_answer,
              res: 'correct'
            })
          } else {
            answersArray[i].push({
              answer:
                state.allQuestions[getQuestions[i].id].incorrect_answers[
                  getAnswers[x]
                ],
              res: 'incorrect'
            })
          }
        }
        answersArray[i] = _.shuffle(answersArray[i])
      }

      setState({
        ...startInitState,
        isGameReadyToStart: true,
        allGameQuestions: getQuestions,
        currentQuestion: state.allQuestions[getQuestions[0].id].question,
        currentQuestionObject: state.allQuestions[getQuestions[0].id],
        allGameAnswers: answersArray,
        currentAnswers: answersArray[state.questionNumber]
      })
    }, 500)
  }

  const restartTrivia = () => {
    setState(initState)
  }

  const printQuestionsAnswers = (type, iterations) => {
    let repeated
    const arrayInput = []

    for (let i = 0; i < iterations; i++) {
      if (arrayInput.length === 0) {
        if (type === 'questions') {
          arrayInput.push({
            id: Math.floor(Math.random() * 47),
            didAnswerCorrect: null
          })
        } else {
          arrayInput.push(Math.floor(Math.random() * iterations) - 1)
        }
      } else {
        do {
          repeated = 0
          var number =
            type === 'questions'
              ? Math.floor(Math.random() * 47)
              : Math.floor(Math.random() * iterations) - 1
          for (let x = 0; x < arrayInput.length; x++) {
            if (type === 'questions') {
              number === arrayInput[x].id && repeated++
            } else {
              number === arrayInput[x] && repeated++
            }
          }
        } while (repeated !== 0)

        if (type === 'questions') {
          arrayInput.push({ id: number, didAnswerCorrect: null })
        } else {
          arrayInput.push(number)
        }
      }
    }

    return arrayInput
  }

  const handleAnswer = answer => {
    const updateGameQuestions = state.allGameQuestions
    updateGameQuestions[state.questionNumber].didAnswerCorrect = answer

    setState({
      ...state,
      allGameQuestions: updateGameQuestions,
      showAnswersFeedback: true,
      totalCorrectAnswers: answer
        ? _.add(state.totalCorrectAnswers, 1)
        : state.totalCorrectAnswers,
      totalIncorrectAnswers: !answer
        ? _.add(state.totalIncorrectAnswers, 1)
        : state.totalCorrectAnswers
    })

    setTimeout(() => {
      var changeQuestion = state.questionNumber + 1

      if (changeQuestion === 10) {
        setState({
          ...state,
          didFinishGame: true
        })

        dispatch(
          updatePokeTriviaResults({
            correctAnswers: state.totalCorrectAnswers,
            wrongAnswers: state.totalIncorrectAnswers
          })
        )
      } else {
        setState({
          ...state,
          currentQuestion:
            state.allQuestions[state.allGameQuestions[changeQuestion].id]
              .question,
          questionNumber: changeQuestion,
          currentQuestionObject:
            state.allQuestions[state.allGameQuestions[changeQuestion].id],
          currentAnswers: state.allGameAnswers[changeQuestion],
          showAnswersFeedback: false,
          totalCorrectAnswers: answer
            ? _.add(state.totalCorrectAnswers, 1)
            : state.totalCorrectAnswers,
          totalIncorrectAnswers: !answer
            ? _.add(state.totalIncorrectAnswers, 1)
            : state.totalIncorrectAnswers
        })
      }
    }, 3000)
  }

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
    return <PokemonTriviaStatic startTrivia={() => startTrivia()} />
  } else {
    if (!isGameReadyToStart) {
      return <Loading />
    } else {
      if (isGameReadyToStart && !didFinishGame) {
        const answerLetters = ['a)', 'b)', 'c)', 'd)']

        return (
          <>
            <SEO
              title={`PokéTrivia Q${_.add(questionNumber, 1)}`}
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
                Question nr. {_.add(questionNumber, 1)}
              </Heading>
              <Heading as="h2" pb={10}>
                {currentQuestion}
              </Heading>
              <SimpleGrid
                w={['100%', null, null, '90%']}
                justifyItems="center"
                gridGap={8}
                columns={[1, null, 2]}
              >
                {currentAnswers.map((item, key) => {
                  return item.res === 'correct' ? (
                    <Button
                      p={6}
                      h="auto"
                      minH={4}
                      w="100%"
                      key={key}
                      whiteSpace="wrap"
                      fontWeight={disabledBtn ? 'bold' : 'normal'}
                      variant={disabledBtn ? 'solid' : 'outline'}
                      borderColor="blue.500"
                      isDisabled={disabledBtn}
                      colorScheme={changeColorCorrect}
                      onClick={() => handleAnswer(true)}
                    >
                      <b>{answerLetters[key]}</b> {item.answer}
                    </Button>
                  ) : (
                    <Button
                      p={6}
                      h="auto"
                      minH={4}
                      w="100%"
                      key={key}
                      whiteSpace="wrap"
                      fontWeight="normal"
                      variant={disabledBtn ? 'solid' : 'outline'}
                      borderColor="blue.500"
                      isDisabled={disabledBtn}
                      colorScheme={changeColorWrong}
                      onClick={() => handleAnswer(false)}
                    >
                      <b>{answerLetters[key]}</b> {item.answer}
                    </Button>
                  )
                })}
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
                  restartTrivia()
                }}
                title="Abandon PokéTrivia?"
                description="Are you sure you want to abandon your session of PokéTrivia? You'll lose all the progress you made in this session"
                when={isOnGame && !didFinishGame}
                shouldBlockNavigation={isOnGame && !didFinishGame}
              />
            </Flex>
          </>
        )
      } else {
        return (
          <PokemonTriviaResults
            answers={{
              correct: totalCorrectAnswers,
              incorrect: totalIncorrectAnswers
            }}
            numberOfQuestions={numberOfQuestions}
            startFunc={startTrivia}
            restartFunc={restartTrivia}
            userProfile={profileContent}
          />
        )
      }
    }
  }
}

export default PokemonTrivia
