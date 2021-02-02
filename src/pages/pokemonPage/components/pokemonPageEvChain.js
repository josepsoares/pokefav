import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getInfoPokemonPage } from 'redux/actions/apiActions'
import pokemon from 'pokemon'
import _ from 'lodash'
import {
  Tooltip,
  Text,
  Flex,
  Grid,
  Box,
  Image,
  Heading,
  Icon
} from '@chakra-ui/react'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa'

class pokemonPageEvChain extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth
    }
  }

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
      return (
        <p className="m-0" key={index}>
          {_.startCase(item)}
        </p>
      )
    } else if (Array.isArray(item)) {
      return item.map((secondItem, key) => {
        if (typeof secondItem === 'object') {
          return (
            <p className="m-0" key={key}>
              {_.startCase(secondItem.name)}
            </p>
          )
        } else {
          return (
            <p className="m-0" key={key}>
              {_.startCase(secondItem)}
            </p>
          )
        }
      })
    } else {
      return (
        <p className="m-0" key={index}>
          {_.startCase(item.name)}
        </p>
      )
    }
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { getInfoPokemonPage, evChainData } = this.props
    const { width } = this.state
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
          return 'This the first or the only pokémon in this evolution chain'
        }
      }

      const arrowRight = width >= 768 && key > 0 && (
        <Icon mx={4} as={FaArrowRight} boxSize={30} />
      )
      const arrowDown = width < 768 &&
        key < pokemonChainEvolutionNames.length - 1 && (
          <Icon my={2} as={FaArrowDown} boxSize={30} />
        )

      return (
        <>
          {arrowRight}
          <Tooltip
            key={key}
            arrow
            label={
              key >= 1 ? (
                <Box textAlign="center" p={2}>
                  <Text m={0} fontWeight="bold">
                    Trigger:
                  </Text>
                  {Array.isArray(evolutionMethodName[key]) ? (
                    <Text my={2}>
                      {_.startCase(evolutionMethodName[key][secondKey])}
                    </Text>
                  ) : (
                    <Text my={2}>{_.startCase(evolutionMethodName[key])}</Text>
                  )}
                  <Text m={0} fontWeight="bold">
                    Requirement:
                  </Text>
                  {getTooltipEvolutionMessage()}
                </Box>
              ) : (
                <Box textAlign="center" p={2}>
                  {getTooltipEvolutionMessage()}
                </Box>
              )
            }
          >
            <Link
              to={`/pokemon-list/national/pokemon-page/${editedPokemonName}`}
              onClick={() => {
                getInfoPokemonPage(pokemonNumber)
              }}
            >
              {Array.isArray(pokemonChainEvolutionNames[key][0]) ? (
                <Image
                  w="100px"
                  h="100px"
                  objectFit="none"
                  alt={editedPokemonName}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${pokemonChainEvolutionNames[key][secondKey][1]}.png`}
                />
              ) : (
                <Image
                  w="100px"
                  h="100px"
                  objectFit="none"
                  alt={editedPokemonName}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${pokemonChainEvolutionNames[key][1]}.png`}
                />
              )}
            </Link>
          </Tooltip>
          {arrowDown}
        </>
      )
    }

    return (
      <>
        <Flex justify="center" w="100%" flexWrap="wrap">
          {pokemonChainEvolutionNames.map((pokeEvName, key) => {
            if (typeof pokeEvName[0] !== 'string') {
              return (
                <Box key={key}>
                  {pokeEvName.map((alternativeEvName, index) => (
                    <Box key={index}>
                      {printPokemonEvContent(
                        alternativeEvName[0],
                        alternativeEvName[1],
                        key,
                        index
                      )}
                    </Box>
                  ))}
                </Box>
              )
            } else {
              return (
                <Flex flexWrap="wrap" justify="center" align="center" key={key}>
                  {printPokemonEvContent(
                    pokemonChainEvolutionNames[key][0],
                    pokemonChainEvolutionNames[key][1],
                    key
                  )}
                </Flex>
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
