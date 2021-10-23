import React from 'react'
import { Box, Flex, Heading, Image, SimpleGrid } from '@chakra-ui/react'
import _ from 'lodash'

const PokemonPageAlternateForms = ({ pokemonInfo }) => {
  const { types, weight, height, abilities, stats, sprites, name } = pokemonInfo
  const splitName = name.split('-')
  const normalizedName =
    _.startCase(splitName[1]) + ' ' + _.startCase(splitName[0])

  const newWeight = weight / 10
  const newHeight = height / 10

  return (
    <SimpleGrid columns={[1, null, 2]}>
      <Flex justify="center" align="center" flexDir="column">
        <Image
          w={['90%', '70%']}
          h="auto"
          objectFit="contain"
          alt={`${normalizedName} official art`}
          src={sprites.other['official-artwork'].front_default}
        />
        <Heading as="h4" textAlign="center">
          {normalizedName}
        </Heading>
      </Flex>
      <Box>
        <Flex
          textAlign="center"
          flexDir="row"
          justify="space-between"
          flexWrap="wrap"
        >
          <Flex justify="center" align="center" flexDir="column">
            <Heading fontSize={18} as="h5">
              Type(s)
            </Heading>
            {types.map((typeItem, key) => (
              <Box
                w="100%"
                key={key}
                className={`typeIcon type-${typeItem.type.name}`}
              >
                {typeItem.type.name}
              </Box>
            ))}
          </Flex>
          <Box>
            <Heading fontSize={18} as="h5">
              Dimensions
            </Heading>
            <p>Weight: {newWeight}kg</p>
            <p>Height: {newHeight}m</p>
          </Box>
          <Box>
            <Heading fontSize={18} as="h5">
              Abilities
            </Heading>
            {abilities.map((abilityItem, key) => (
              <p key={key}>{_.startCase(abilityItem.ability.name)}</p>
            ))}
          </Box>
        </Flex>

        <Box py={8}>
          <Heading fontSize={18} as="h5" pb={6} textAlign="center">
            Value Stat Points
          </Heading>
          <SimpleGrid
            columns={[1, 2, null, 3]}
            gridGap={6}
            flexWrap="wrap"
            justify="center"
            align="center"
          >
            {stats.map((statsItem, key) => (
              <Box key={key} textAlign="center">
                <Heading as="h6" fontSize={16}>
                  {_.startCase(statsItem.stat.name)}
                </Heading>
                <p>{_.startCase(statsItem.base_stat)} points</p>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </SimpleGrid>
  )
}

export default PokemonPageAlternateForms
