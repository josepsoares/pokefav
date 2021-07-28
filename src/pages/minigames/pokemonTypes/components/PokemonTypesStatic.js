import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDisclosure } from '@chakra-ui/hooks'
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text
} from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/modal'
import { Image } from '@chakra-ui/image'
import { FaDna, FaArrowLeft, FaArrowRight, FaQuestion } from 'react-icons/fa'

import Button from 'components/layout/Button'
import SEO from 'components/Seo'

const contentsAvailableForGame = ['Pokémons', 'Moves', 'Pokémons and Moves']

const PokemonTypesStatic = ({ startPokeTypes }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tutorial, setTutorial] = useState(null)
  const [contentInGame, setContentInGame] = useState('Pokémons')

  const profile = useSelector(state => state.firebase.profile)
  /*   const {
    realizedTrivias,
    correctAnswers,
    wrongAnswers,
    pokemonIQ
  } = profile.triviaRecord */

  return (
    <>
      <SEO
        title="PokéTypes"
        description="Play a fun minigame with challeging questions about specific details about Pokémon Moves"
      />

      <Flex>
        <Button onClick={onOpen} colorScheme="blue" leftIcon={<FaArrowLeft />}>
          Go Back to PokéMinigames
        </Button>
      </Flex>

      <Flex>
        <Heading as="h1" pb={8}>
          PokéTypes
        </Heading>
        <Button colorScheme="blue" onClick={onOpen} leftIcon={<FaQuestion />}>
          How to Play
        </Button>
      </Flex>

      <SimpleGrid columns={[1, null, null, 2]} justify="center" gridGap={6}>
        <Box order={[2, null, null, 1]}>
          <Heading as="h4">Moves, they're </Heading>
          <Text pb={4}>
            How about testing those skills by playing this Trivia, made by us,
            in order to determine what Pokémon you would be based on your
            intelligence?
          </Text>

          <Text pb={4}>
            To find the answer just starting playing the trivia that consists in
            10 rounds with a question and 4 answers for each round.
          </Text>

          <Text pb={8}>
            Are you an intellectual like Alakazam or Metagross or are you as
            oblivious as Slowpoke or Magikarp? Check out your profile when
            you're done to find out what pokémon are you!
          </Text>

          {/* {pokemonIQ && (
            <Text fontSize={18} textAlign="center">
              Your Pokémon IQ currently is the same as a{' '}
              <Box as="b" color="#ffe066">
                {pokemonIQ}
              </Box>
            </Text>
          )} */}

          <Flex
            pt={12}
            w="100%"
            flexWrap="wrap"
            align="center"
            justify="center"
            gridGap={6}
          >
            <Button colorScheme="blue" onClick={onOpen} leftIcon={<FaDna />}>
              Check your PokéTypes Stats
            </Button>

            <Button
              colorScheme="green"
              onClick={startPokeTypes}
              rightIcon={<FaArrowRight />}
            >
              Start PokéTypes Now
            </Button>
          </Flex>
        </Box>
        <Flex justify="center" align="center" order={[1, null, null, 2]}>
          <Image
            maxH="400px"
            maxW="400px"
            objectFit="contain"
            objectPosition="center"
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/065_f2.png"
            alt="Alakazam"
          />
        </Flex>
      </SimpleGrid>
      <SimpleGrid
        columns={[1, null, null, 2]}
        justify="center"
        gridGap={6}
      ></SimpleGrid>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
        size="lg"
      >
        <ModalOverlay />
        <ModalContent color="#3c3c3b" bgColor="#ebebd3">
          <ModalHeader>
            <Heading pb={2} as="h4">
              Your PokéTrivia Stats
            </Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack
              divider={<StackDivider borderColor="gray.200" />}
              spacing={4}
              direction={['column', null, 'row']}
            >
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  PokéTypes played
                </Text>
                <Text>{/* realizedTrivias */}</Text>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  Correct answers
                </Text>
                <Text>{/* correctAnswers */}</Text>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  Incorrect answers
                </Text>
                <Text>{/* wrongAnswers */}</Text>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  Pokémon IQ
                </Text>
                <Text>{/* !pokemonIQ ? 'None' : pokemonIQ */}</Text>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default PokemonTypesStatic
