import React from 'react';
import { useDispatch } from 'react-redux';
import { getInfoPokemonPage } from 'redux/actions/pokemonActions';
import { Link } from 'react-router-dom';
import { Box, Flex, Image, Icon, Text } from '@chakra-ui/react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import pokemon from 'pokemon';

const PokemonPageNextPrevious = props => {
  const dispatch = useDispatch();
  const pokemonIds = [];
  let { pokemonId } = props;
  var pokemonNextName, pokemonPreviousName;

  if (pokemonId === 1) {
    pokemonIds.push((pokemonId += 1));
    pokemonNextName = pokemon.getName(`${pokemonIds[0]}`);
  } else if (pokemonId === 808) {
    pokemonIds.push((pokemonId -= 1));
    pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`);
  } else {
    pokemonIds.push((pokemonId -= 1));
    pokemonIds.push((pokemonId += 2));
    pokemonPreviousName = pokemon.getName(`${pokemonIds[0]}`);
    pokemonNextName = pokemon.getName(`${pokemonIds[1]}`);
  }

  const hasPreviousPokemonLink = props.pokemonId > 1 && props.pokemonId <= 808;
  const hasNextPokemonLink = props.pokemonId >= 1 && props.pokemonId < 808;
  const noPreviousPokemon = hasNextPokemonLink && !hasPreviousPokemonLink;

  return (
    <Flex
      wrap="wrap"
      align="center"
      justify={
        hasPreviousPokemonLink && hasNextPokemonLink
          ? 'space-between'
          : noPreviousPokemon
          ? 'flex-end'
          : 'flex-start'
      }
    >
      {hasPreviousPokemonLink && (
        <Box
          as={Link}
          className="basicLink"
          to={`/pokemon-list/national/pokemon-page/${pokemonPreviousName.toLowerCase()}`}
          onClick={ev => dispatch(getInfoPokemonPage(ev.currentTarget.id))}
        >
          <Flex flexDir="row" align="center" justify="flex-start">
            <Icon as={IoIosArrowBack} mr={2} />
            <Image
              objectFit="contain"
              alt={pokemonPreviousName}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${pokemonIds[0]}.png`}
            />
            <Text py={2}>{pokemonPreviousName}</Text>
          </Flex>
        </Box>
      )}
      {hasNextPokemonLink && (
        <Box
          as={Link}
          className="basicLink"
          to={`/pokemon-list/national/pokemon-page/${pokemonNextName.toLowerCase()}`}
          onClick={ev => dispatch(getInfoPokemonPage(ev.currentTarget.id))}
        >
          <Flex flexDir="row" align="center" justify="flex-end">
            <Image
              objectFit="contain"
              alt={pokemonNextName}
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/icons/${pokemonIds[1]}.png`}
            />
            <Text py={2}>{pokemonNextName}</Text>
            <Icon ml="13px" as={IoIosArrowForward} />
          </Flex>
        </Box>
      )}
    </Flex>
  );
};

export default PokemonPageNextPrevious;
