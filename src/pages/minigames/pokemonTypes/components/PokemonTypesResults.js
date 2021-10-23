import React from 'react'
import { Box, SimpleGrid, Image, Text, Heading, Flex } from '@chakra-ui/react'
import { FaArrowLeft, FaRedoAlt } from 'react-icons/fa'
import Button from 'components/layout/Button'
import SEO from 'components/Seo'

const PokemonTypesResults = props => {
  const {
    userProfile,
    startFunc,
    restartFunc,
    numberOfQuestions,
    answers
  } = props

  let averageCorrectAnswers = (answers.correct / numberOfQuestions) * 100
  averageCorrectAnswers = parseInt(averageCorrectAnswers)

  const endMessage =
    averageCorrectAnswers === 100
      ? 'You were perfect on this round of PokéTrivia! Truly a pokémon trivia master!'
      : averageCorrectAnswers >= 75
      ? 'You did amazingly on this round of PokéTrivia, it seems you did not forget about all that pokémon trivia'
      : averageCorrectAnswers >= 50
      ? 'It could have gone better but you still did ok in this round, maybe a little bit more of remembering and studying of pokémon trivia and you will be even better'
      : averageCorrectAnswers >= 25
      ? 'So, rusty we are in pokémon trivia? Gotta remember all those facts or maybe just search the answer or the web'
      : 'Humm, it seems you did very badly on this round... I hope you were not doing it on purpose... If not just check the answers on the web, this way you might even memorize some pokémon trivia facts'

  return (
    <>
      <SEO
        title="PokéTrivia Results"
        description="Play a fun trivia filled with challeging questions about facts and mechanics about Pokémon Franchise"
      />
      <Heading as="h1" pb={8}>
        PokéTrivia Results
      </Heading>
      <SimpleGrid columns={[1, null, null, 2]} justify="center" gridGap={6}>
        <Box order={[2, null, null, 1]}>
          <Text pb={4}>
            Nice, you finished a session of PokéTrivia, well done!
          </Text>
          <Text pb={8}>
            In this session of trivia you've answered{' '}
            <Box color="green.400" as="span">
              {answers.correct} correctly
            </Box>{' '}
            and{' '}
            <Box color="red.300" as="span">
              {answers.incorrect} incorrectly
            </Box>
            . Your average of correct answers was{' '}
            <Box fontWeight="bold" as="span">
              {averageCorrectAnswers}%
            </Box>
            .
          </Text>

          <Text fontSize={20} textAlign="center" fontWeight="bold" pb={6}>
            {endMessage}
          </Text>

          <Text fontSize={18} textAlign="center">
            Your Pokémon IQ currently is the same as a{' '}
            <Box as="b" color="#ffe066">
              {userProfile.triviaRecord.pokemonIQ}
            </Box>
          </Text>

          <Flex
            pt={12}
            w="100%"
            flexWrap="wrap"
            align="center"
            justify="center"
            gridGap={6}
          >
            <Button
              colorScheme="blue"
              leftIcon={<FaArrowLeft />}
              onClick={restartFunc}
            >
              Go back to PokéTrivia
            </Button>
            <Button
              colorScheme="green"
              leftIcon={<FaRedoAlt />}
              onClick={startFunc}
            >
              Play Again
            </Button>
          </Flex>
        </Box>
        <Flex justify="center" align="center" order={[1, null, null, 2]}>
          <Image
            maxH="400px"
            maxW="400px"
            src={
              userProfile.triviaRecord.pokemonIQNumber
                ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${userProfile.triviaRecord.pokemonIQNumber}.png`
                : 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/065_f2.png'
            }
            alt="Pokémon Trivia IQ"
            objectFit="contain"
            objectPosition="center"
          />
        </Flex>
      </SimpleGrid>
    </>
  )
}

export default PokemonTypesResults
