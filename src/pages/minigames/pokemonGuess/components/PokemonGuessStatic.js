import React, { useEffect, useState } from 'react';
import {
  Box,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Flex,
  Stack,
  StackDivider,
  useDisclosure,
  IconButton,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Select,
  FormControl
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import {
  FaArrowLeft,
  FaArrowRight,
  FaGraduationCap,
  FaQuestion
} from 'react-icons/fa';

import Button from 'components/layout/Button';
import SEO from 'components/Seo';

const difficulties = ['normal', 'hard'];

const PokemonGuessStatic = ({ startPokeGuess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const [tutorial, setTutorial] = useState(null)
  // const [difficulty, setDifficulty] = useState('normal')
  // const [pokemonSample, setPokemonSample] = useState('national')
  const profile = useSelector(state => state.firebase.profile);
  const {
    pokeGuess,
    pokemonIQ,
    pokemonIQNr,
    played: minigamesPlayed,
    overallScore
  } = profile.minigames;
  const {
    played: pokeGuessesPlayed,
    correctGuesses,
    incorrectGuesses,
    score: pokeGuessScore
  } = pokeGuess;

  useEffect(() => {}, []);

  return (
    <>
      <SEO
        title="PokéGuess"
        description="Play a fun trivia filled with challeging questions about facts and mechanics about the Pokémon Franchise"
      />

      <Flex justifyContent="space-between" flexDir="row" flexWrap="wrap">
        <Heading as="h1" pb={8}>
          PokéGuess
        </Heading>
        <Button colorScheme="blue" onClick={onOpen} leftIcon={<FaQuestion />}>
          How to Play
        </Button>
      </Flex>

      <SimpleGrid columns={[1, null, null, 2]} justify="center" gridGap={6}>
        <Box order={[2, null, null, 1]}>
          <Heading as="h4">
            Do you think you know your fair share of knowledge of the Pokémon
            universe?{' '}
          </Heading>
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

          {pokeGuessScore && (
            <Text fontSize={18} textAlign="center">
              Your Pokémon IQ currently is the same as a{' '}
              <Box as="b" color="#ffe066">
                {pokeGuessScore}
              </Box>
            </Text>
          )}

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
              leftIcon={<FaGraduationCap />}
              onClick={onOpen}
            >
              Check your PokéGuess stats
            </Button>
            <Button
              isDisabled={true}
              colorScheme="green"
              rightIcon={<FaArrowRight />}
              onClick={() => startPokeGuess()}
            >
              Start game of PokéGuess
            </Button>
          </Flex>

          {/*
          https://pokeapi.co/api/v2/pokedex/

          <FormControl>
            <FormLabel>Pokédex</FormLabel>
            <Select
              styles={{
                valueContainer: () => ({
                  padding: '0 1rem'
                }),
                control: provided => ({
                  ...provided,
                  '&:hover': {
                    borderColor: '#f88d87'
                  }
                })
              }}
              size="md"
              name="selectValue"
              value={{
                value: selectValue,
                label: _.startCase(selectValue)
              }}
              onChange={handleSelectChange}
              options={optionsSelectSpecifics}
              isSearchable={false}
            />
          </FormControl> */}
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

      <Flex position="fixed" top="90%" left="7%">
        <IconButton
          boxShadow="dark-lg"
          width="50px"
          height="50px"
          borderRadius="50%"
          colorScheme="blue"
          isRound={true}
        >
          <FaArrowLeft />
        </IconButton>
      </Flex>

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
              Your PokéGuess Stats
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
                  PokéGuess sessions played
                </Text>
                <Text>{pokeGuessesPlayed}</Text>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  Correct guesses
                </Text>
                <Text>{correctGuesses}</Text>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  Incorrect guesses
                </Text>
                <Text>{incorrectGuesses}</Text>
              </Flex>
              <Flex flexDir="column" align="center">
                <Text fontWeight="bold" pb={2}>
                  PokéGuess IQ
                </Text>
                <Text>{!pokeGuessScore ? 'None' : pokeGuessScore}</Text>
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
  );
};

export default PokemonGuessStatic;
