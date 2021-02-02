import React from 'react'
import { Box, Flex, SimpleGrid, Heading, Text } from '@chakra-ui/react'
import _ from 'lodash'

const pokemonPageGenericInfo = ({ pokemonInfo }) => {
  const { types, weight, height, abilities, stats } = pokemonInfo[0]
  const { egg_groups } = pokemonInfo[1]

  const newWeight = weight / 10
  const newHeight = height / 10

  return (
    <>
      <SimpleGrid
        py={10}
        gridGap={[4, 6]}
        columns={[1, 2, 4]}
        alignItems="center"
        justifyItems="center"
        textAlign="center"
      >
        <Box>
          <Heading as="h4">Type(s)</Heading>
          <Flex justify="center" align="center" flexDir="column">
            {types.map((typeItem, key) => (
              <Box key={key} className={`typeIcon type-${typeItem.type.name}`}>
                {typeItem.type.name}
              </Box>
            ))}
          </Flex>
        </Box>
        <Box>
          <Heading as="h4">Abilities</Heading>
          {abilities.map((abilityItem, key) => (
            <p key={key}>{_.startCase(abilityItem.ability.name)}</p>
          ))}
        </Box>
        <Box>
          <Heading as="h4">Egg Groups</Heading>
          {egg_groups[0].name === 'no-eggs' ? (
            <p>This Pokémon can't breed</p>
          ) : (
            egg_groups.map((eggItem, key) => (
              <p key={key}>{_.startCase(eggItem.name)}</p>
            ))
          )}
        </Box>
        <Box>
          <Heading as="h4">Dimensions</Heading>
          <p>Weight: {newWeight}kg</p>
          <p>Height: {newHeight}m</p>
        </Box>
      </SimpleGrid>

      <Box py={8}>
        <Heading as="h4" pb={8} textAlign="center">
          Value Stat Points
        </Heading>
        <Flex gridGap={12} flexWrap="wrap" justify="center" align="center">
          {stats.map((statsItem, key) => (
            <Box key={key} textAlign="center">
              <Heading as="h6" fontSize={20}>
                {_.startCase(statsItem.stat.name)}
              </Heading>
              <p>{_.startCase(statsItem.base_stat)} points</p>
            </Box>
          ))}
        </Flex>
      </Box>
    </>
  )
}

export default pokemonPageGenericInfo
