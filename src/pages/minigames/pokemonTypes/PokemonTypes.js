import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Flex,
  Heading,
  Icon,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import { FaQuestion, FaSignInAlt, FaArrowRight } from 'react-icons/fa';
import ConfirmationLeave from 'components/feedback/ConfirmationLeave';

import _ from 'lodash';

import Button from 'components/layout/Button';
import Loading from 'components/feedback/Loading';
import SEO from 'components/Seo';
import Error from 'components/feedback/Error';

import PokemonApiService from 'services/pokemonApi';

import PokemonTypesResults from 'pages/minigames/pokemonTypes/components/PokemonTypesResults';
import PokemonTypesStatic from 'pages/minigames/pokemonTypes/components/PokemonTypesStatic';
import PokeTypesDragContainers from 'components/pages/minigames/pokemonTypes/PokeTypesDragContainers';
import { rectSortingStrategy } from '@dnd-kit/sortable';

const PokemonTypes = () => {
  const initState = {
    typesNumber: 4,
    typesArray: [],
    isGameReadyToStart: false,
    isOnGame: false,
    didFinishGame: false,
    showFeedback: false,
    drawnPokemon: [],
    allPokemons: []
  };

  const [state, setState] = useState(initState);
  const [confirmModal, setConfirmModal] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const profileContent = useSelector(state => state.firebase.profile);
  const updateTriviaResultError = useSelector(
    state => state.minigames.updateTriviaResultError
  );

  const startMinigame = async () => {
    setState({ ...state, isOnGame: true });
    const types = await PokemonApiService.getPokemonTypes();
    const filteredTypes = types.results.filter(
      i => i.name !== 'shadow' && i.name !== 'unknown'
    );

    console.log('results =>', filteredTypes);

    const randomTypes = _.sampleSize(filteredTypes, 4);
    const pokemonArray = [];

    console.log(randomTypes);

    let amountOfPokemonToCalc = _.random(20, 25);

    for await (const [i, type] of randomTypes.entries()) {
      const getTypeInformation = await PokemonApiService.getType(type.name);
      const pokemonsOfType = getTypeInformation.pokemon;

      const pokemonsOfTypeFilt = pokemonsOfType.filter(pok => {
        const pokUrl = pok.pokemon.url;
        const pokSplitUrl = pokUrl.split('/');
        const pokParseNr = parseInt(pokSplitUrl[6]);
        return pokParseNr < 808;
      });

      const randomNrOfPokemon =
        i !== randomTypes.length - 1 ? _.random(4, 7) : amountOfPokemonToCalc;

      pokemonArray.push(_.sampleSize(pokemonsOfTypeFilt, randomNrOfPokemon));

      randomTypes[i] = {
        ...randomTypes[i],
        pokemons: _.sampleSize(pokemonsOfTypeFilt, randomNrOfPokemon)
      };

      amountOfPokemonToCalc -= randomNrOfPokemon;
    }

    console.log('FINAL TESTE =>', randomTypes, pokemonArray);

    const allPokemonsArray = pokemonArray.flat();

    setState({
      ...state,
      isOnGame: true,
      typesArray: randomTypes,
      drawnPokemon: pokemonArray,
      allPokemons: _.shuffle(allPokemonsArray),
      isGameReadyToStart: true
    });
  };

  const restartMinigame = () => {
    setState(initState);
  };

  const {
    isOnGame,
    isGameReadyToStart,
    didFinishGame,
    typesArray,
    drawnPokemon,
    allPokemons
  } = state;

  if (updateTriviaResultError) {
    return (
      <Error error="An error occurred while updating your trivia stats. Please try playing again PokéTrivia later." />
    );
  } else if (!isOnGame) {
    return <PokemonTypesStatic startMinigame={startMinigame} />;
  } else {
    if (!isGameReadyToStart) {
      return <Loading />;
    } else if (isGameReadyToStart && !didFinishGame) {
      return (
        <>
          <SEO
            title="PokéTypes"
            description="Play a fun drag and drop minigame to test your type knowledge in the Pokémon Franchise"
          />
          <Flex
            textAlign="center"
            flexDir="column"
            align="center"
            justify="center"
          >
            <Heading as="h1" fontSize="5xl">
              Timeleft:{' '}
              <Box as="span" color="primary">
                2:00
              </Box>
            </Heading>
            <Heading as="h3">
              Drag the pokémons to the box representing their type until the
              time ends!
            </Heading>

            <PokeTypesDragContainers
              allPokemons={allPokemons}
              pokemonsByType={drawnPokemon}
              types={typesArray}
              columns={2}
              strategy={rectSortingStrategy}
              wrapperStyle={() => ({
                width: 150,
                height: 150
              })}
            />

            <Flex>
              <Button
                colorScheme="green"
                onClick={startMinigame}
                rightIcon={<FaArrowRight />}
              >
                Submit Selection
              </Button>
            </Flex>

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
              title="Abandon PokéTypes?"
              description="Are you sure you want to abandon your session of PokéTypes? You'll lose all the progress you made in this session"
              when={isOnGame && !didFinishGame}
              shouldBlockNavigation={isOnGame && !didFinishGame}
            />
          </Flex>
        </>
      );
    } else {
      return (
        <PokemonTypesResults
          startFunc={startMinigame}
          restartFunc={restartMinigame}
        />
      );
    }
  }
};

export default PokemonTypes;
