import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInfoPokemonPage } from 'redux/actions/apiActions'
import pokemon from 'pokemon'
import _ from 'lodash'
import { Text, Flex, Box, Icon, Image } from '@chakra-ui/react'
import { FaArrowDown } from 'react-icons/fa'

import { CgPokemon } from 'react-icons/cg'

class pokemonPageEvChain extends Component {
  objectWithoutKey = (object, key) => {
    const { [key]: deletedKey, ...otherKeys } = object
    return otherKeys
  }

  getPokemonEvolutionMethodsAndNames = (
    item,
    index,
    arrayPokemonName,
    arrayMethodName,
    arrayMethod
  ) => {
    let url = item.species.url.trim()
    let pokemonNumber = url.split('/')[6]
    let pokemonName = pokemon.getName(pokemonNumber)
    const checkConditions = []
    const NewEvolutionObject = this.objectWithoutKey(
      item.evolution_details[0],
      'trigger'
    )
    Object.entries(NewEvolutionObject).forEach(val => {
      if (val[1] !== null && val[1] !== '' && val[1] !== false) {
        checkConditions.push(val)
      }
    })

    if (index !== false && index >= 1) {
      arrayPokemonName[arrayPokemonName.length - 1].push([
        pokemonName,
        pokemonNumber
      ])
      arrayMethodName[arrayPokemonName.length - 1].push([
        item.evolution_details[0].trigger.name
      ])
      arrayMethod[arrayPokemonName.length - 1].push([...checkConditions])
    } else if (index !== false) {
      arrayPokemonName.push([[pokemonName, pokemonNumber]])
      arrayMethodName.push([[item.evolution_details[0].trigger.name]])
      arrayMethod.push([checkConditions])
    } else {
      arrayPokemonName.push([pokemonName, pokemonNumber])
      arrayMethodName.push(item.evolution_details[0].trigger.name)
      arrayMethod.push([...checkConditions])
    }
  }

  conditionsEvolution = (item, index) => {
    if (typeof item === 'string' || typeof item === 'number') {
      return <p key={index}>{_.startCase(item)}</p>
    } else if (Array.isArray(item)) {
      return item.map((secondItem, key) => {
        if (typeof secondItem === 'object') {
          return <p key={key}>{_.startCase(secondItem.name)}</p>
        } else {
          return <p key={key}>{_.startCase(secondItem)}</p>
        }
      })
    } else {
      return <p key={index}>{_.startCase(item.name)}</p>
    }
  }

  render() {
    const { getInfoPokemonPage, evChainData } = this.props
    let evolutionMethod = ['']
    let evolutionMethodName = ['']
    let pokemonChainEvolutionNames = []

    const url = evChainData.chain.species.url.trim()
    pokemonChainEvolutionNames.push([
      pokemon.getName(url.split('/')[6]),
      url.split('/')[6]
    ])

    if (evChainData.chain.evolves_to[0] !== undefined) {
      if (evChainData.chain.evolves_to.length !== 1) {
        for (let [index, item] of evChainData.chain.evolves_to.entries()) {
          this.getPokemonEvolutionMethodsAndNames(
            item,
            index,
            pokemonChainEvolutionNames,
            evolutionMethodName,
            evolutionMethod
          )
        }
      } else {
        this.getPokemonEvolutionMethodsAndNames(
          evChainData.chain.evolves_to[0],
          false,
          pokemonChainEvolutionNames,
          evolutionMethodName,
          evolutionMethod
        )
      }

      if (evChainData.chain.evolves_to[0].evolves_to[0] !== undefined) {
        if (evChainData.chain.evolves_to[0].evolves_to.length !== 1) {
          for (let [
            index,
            item
          ] of evChainData.chain.evolves_to[0].evolves_to.entries()) {
            this.getPokemonEvolutionMethodsAndNames(
              item,
              index,
              pokemonChainEvolutionNames,
              evolutionMethodName,
              evolutionMethod
            )
          }
        } else {
          this.getPokemonEvolutionMethodsAndNames(
            evChainData.chain.evolves_to[0].evolves_to[0],
            false,
            pokemonChainEvolutionNames,
            evolutionMethodName,
            evolutionMethod
          )
        }
      }
    }

    const printPokemonEvContent = (
      pokemonEvName,
      pokemonEvNumber,
      key,
      secondKey
    ) => {
      const editedPokemonName = pokemonEvName.toLowerCase()
      const pokemonNumber = pokemonEvNumber

      const getTooltipEvolutionMessage = () => {
        if (evolutionMethodName.length > 1 && evolutionMethodName[key] !== '') {
          if (evolutionMethod[key].length > 1) {
            if (secondKey === undefined) {
              return evolutionMethod[key].map(specificItem => {
                return specificItem.map((specificInfo, index) =>
                  this.conditionsEvolution(specificInfo, index)
                )
              })
            } else {
              return evolutionMethod[key][secondKey].map((item, key) =>
                this.conditionsEvolution(item, key)
              )
            }
          } else {
            return evolutionMethod[key].map((item, key) =>
              this.conditionsEvolution(item, key)
            )
          }
        } else {
          if (evolutionMethodName.length > 1) {
            return 'This is the base Pokémon of this evolution chain'
          } else {
            return 'This is the only Pokémon in this evolution chain, meaning this Pokémon does not evolve'
          }
        }
      }

      return (
        <>
          <Flex
            p={6}
            flexDir="row"
            bgColor="#ebebd3"
            borderRadius="6px"
            wrap="wrap"
            gridGap={[6, null, 8, 14]}
            boxShadow="md"
            justify="center"
            align="center"
            color="#3c3c3b"
            w={['100%', null, null, '80%']}
          >
            <Box
              as={Link}
              to={`/pokemon-list/pokemon-page/${editedPokemonName}`}
              onClick={() => {
                getInfoPokemonPage(pokemonNumber)
              }}
            >
              <Box
                className="pokemon-image ev-image"
                overflow="visible"
                position="relative"
              >
                <Image
                  zIndex="3"
                  boxSize="100px"
                  position="relative"
                  objectFit="scale-down"
                  src={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${pokemonNumber}.png`}
                  fallbackSrc={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${pokemonNumber}.png`}
                  alt={pokemonEvName}
                />
                <Icon
                  as={CgPokemon}
                  boxSize="8rem"
                  position="absolute"
                  top="39%"
                  left="51%"
                  opacity="0.5"
                  transform="translate(-50%, -50%)"
                  zIndex="2"
                />
                <Text textAlign="center" pt={2}>
                  {pokemonEvName}
                </Text>
              </Box>
            </Box>
            {key >= 1 ? (
              <>
                <Box>
                  <Text m={0} fontWeight="bold">
                    Evolution Trigger(s):
                  </Text>
                  {Array.isArray(evolutionMethodName[key]) ? (
                    <Text my={2}>
                      {_.startCase(evolutionMethodName[key][secondKey])}
                    </Text>
                  ) : (
                    <Text my={2}>{_.startCase(evolutionMethodName[key])}</Text>
                  )}
                </Box>

                <Box>
                  <Text m={0} fontWeight="bold">
                    Evolution Requirement(s):
                  </Text>
                  {getTooltipEvolutionMessage()}
                </Box>
              </>
            ) : (
              <>{getTooltipEvolutionMessage()}</>
            )}
          </Flex>
          {key < pokemonChainEvolutionNames.length - 1 && (
            <Flex color="secondary" flexDir="column" align="center">
              {_.isArray(pokemonChainEvolutionNames[_.add(key, 1)][0]) ? (
                <Text>
                  Evolves into <b>one</b> of the following Pokémon:
                </Text>
              ) : (
                <Text>Evolves into:</Text>
              )}
              <Icon my={2} as={FaArrowDown} boxSize={30} />
            </Flex>
          )}
        </>
      )
    }

    return (
      <>
        <Flex
          gridGap={6}
          flexDir="column"
          align="center"
          justify="center"
          w="100%"
        >
          {pokemonChainEvolutionNames.map((pokeEvName, key) => {
            if (typeof pokeEvName[0] !== 'string') {
              return (
                <Fragment key={key}>
                  {pokeEvName.map((alternativeEvName, index) => (
                    <Fragment key={`poké ev - ${index}`}>
                      {printPokemonEvContent(
                        alternativeEvName[0],
                        alternativeEvName[1],
                        key,
                        index
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              )
            } else {
              return printPokemonEvContent(
                pokemonChainEvolutionNames[key][0],
                pokemonChainEvolutionNames[key][1],
                key
              )
            }
          })}
        </Flex>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInfoPokemonPage: pokemon => dispatch(getInfoPokemonPage(pokemon))
  }
}

export default connect(null, mapDispatchToProps)(pokemonPageEvChain)
