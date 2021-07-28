import React from 'react'
import { Flex, Icon, Text } from '@chakra-ui/react'
import { CgPokemon } from 'react-icons/cg'

const PokeballMinigameStat = ({ statData, statTitle }) => {
  return (
    <Flex align="center" flexDir="column">
      <Flex
        position="relative"
        align="center"
        justify="center"
        boxSize="175px"
        borderRadius="50%"
        fontWeight="bold"
        color="secondary"
        fontSize={20}
      >
        <Icon
          color="tertiary"
          as={CgPokemon}
          boxSize="175px"
          position="absolute"
          opacity="0.5"
          zIndex="1"
        />
        <Flex
          zIndex="2"
          justify="center"
          align="center"
          boxSize="55px"
          borderRadius="50%"
          bg="primary"
        >
          <Text>{statData}</Text>
        </Flex>
      </Flex>
      <Text w={['auto', '200px']} textAlign="center" fontWeight="bold" pb={2}>
        {statTitle}
      </Text>
    </Flex>
  )
}

export default PokeballMinigameStat
