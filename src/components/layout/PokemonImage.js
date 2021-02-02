import React from 'react'
import { Box, Icon, Image, Text } from '@chakra-ui/react'
import { CgPokemon } from 'react-icons/cg'

const PokemonImage = ({ pokemonName, pokemonNumber }) => {
  return (
    <Box className="pokemon-image" position="relative">
      <Image
        h="110px"
        objectFit="scale-down"
        src={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${pokemonNumber}.png`}
        fallbackSrc={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${pokemonNumber}.png`}
        alt={pokemonName}
      />
      <Icon
        as={CgPokemon}
        boxSize="10rem"
        position="absolute"
        top="39%"
        left="51%"
        opacity="0.5"
        transform="translate(-50%, -50%)"
        zIndex="-1"
      />
      <Text pt={6}>{pokemonName}</Text>
    </Box>
  )
}

export default PokemonImage
