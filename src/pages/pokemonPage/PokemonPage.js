import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  addFavoritePokemon,
  removeFavoritePokemon,
  addPokemonToTeam,
  removePokemonFromTeam
} from 'redux/actions/userFavoritesActions'

import PokemonPageMoves from './components/pokemonPageMoves'
import PokemonPageGenericInfo from './components/pokemonPageGenericInfo'
import PokemonPageEvChain from './components/pokemonPageEvChain'
import PokemonPageNextPrevious from './components/pokemonPageNextPrevious'
import PokemonPageAlternateForms from './components/pokemonPageAlternateForms'
import Button from 'components/layout/Button'

import pokemon from 'pokemon'
import _ from 'lodash'

import {
  Text,
  Heading,
  Box,
  Flex,
  ButtonGroup,
  SimpleGrid,
  Image,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Icon,
  Divider
} from '@chakra-ui/react'
import {
  FaCompactDisc,
  FaEgg,
  FaPlus,
  FaPlusCircle,
  FaStar,
  FaStopCircle,
  FaTrashAlt
} from 'react-icons/fa'
import SEO from 'components/Seo'

class PokePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: 0,
      moveMethod: 'level-up',
      cards: [],
      cardsShown: 6
    }
  }

  _toggleTab = tab => {
    this.state.activeTab !== tab[0] &&
      this.setState({ activeTab: tab[0], moveMethod: tab[1] })
  }

  _getPokemonTeamUserButton = (name, pokeStats, pokeId) => {
    const {
      profilePokemonTeam,
      addPokemonToTeam,
      removePokemonFromTeam
    } = this.props

    const foundPokemonTeam = profilePokemonTeam.find(
      pokemon => pokemon.name === name
    )

    if (foundPokemonTeam) {
      return (
        <Button
          colorScheme="red"
          isLoading={false}
          leftIcon={<FaTrashAlt />}
          onClick={() => removePokemonFromTeam(name)}
        >
          Remove From Team
        </Button>
      )
    } else if (profilePokemonTeam.length === 6) {
      return (
        <Button
          colorScheme="yellow"
          isDisabled={true}
          leftIcon={<FaStopCircle />}
        >
          Team is Full
        </Button>
      )
    } else {
      return (
        <Button
          colorScheme="green"
          isLoading={false}
          leftIcon={<FaPlusCircle />}
          onClick={() =>
            addPokemonToTeam([name, name.toLowerCase(), pokeStats, pokeId])
          }
        >
          Add to Team
        </Button>
      )
    }
  }

  _getPokemonFavoritesUserButton = (name, pokeStats, pokeId) => {
    const {
      profilePokemonFavorites,
      addFavoritePokemon,
      removeFavoritePokemon
    } = this.props
    const foundPokemonFavorites = profilePokemonFavorites.find(
      pokemon => pokemon.name === name
    )

    if (foundPokemonFavorites) {
      return (
        <Button
          colorScheme="red"
          isLoading={false}
          leftIcon={<FaTrashAlt />}
          onClick={() => removeFavoritePokemon(name)}
        >
          Remove from Favorites List
        </Button>
      )
    } else if (profilePokemonFavorites.length === 15) {
      return (
        <Button
          colorScheme="yellow"
          isDisabled={true}
          leftIcon={<FaStopCircle />}
        >
          Favorites List is full
        </Button>
      )
    } else {
      return (
        <Button
          colorScheme="green"
          isLoading={false}
          leftIcon={<FaPlusCircle />}
          onClick={() =>
            addFavoritePokemon([name, name.toLowerCase(), pokeStats, pokeId])
          }
        >
          Add to Favorites List
        </Button>
      )
    }
  }

  componentDidMount() {
    const { pokemonCards } = this.props

    this.setState({ cards: pokemonCards.slice(0, 6) })
  }

  render() {
    const { cards, cardsShown } = this.state
    const {
      auth,
      pokemonInfo,
      pokemonEvChainInfo,
      pokemonAlternateFormInfo,
      pokemonCards
    } = this.props
    const { moves, stats, id, sprites } = pokemonInfo[0]
    const { names, forms_switchable, flavor_text_entries } = pokemonInfo[1]
    console.log(pokemonInfo[0], pokemonInfo[1])
    const pokemonName = pokemon.getName(id)
    var uniqueNames = new Set()

    for (let item of names) {
      item.language.name !== 'en' &&
        item.name !== pokemonName &&
        uniqueNames.add(item.name)
    }

    const movesArray = [
      {
        value: 'level-up',
        name: 'Level-Up Moves',
        icon: FaStar
      },
      {
        value: 'machine',
        name: 'TMs/HMs Moves',
        icon: FaCompactDisc
      },
      {
        value: 'egg',
        name: 'Egg Moves',
        icon: FaEgg
      }
    ]

    const getEngDescriptions = _.shuffle(
      flavor_text_entries.filter((thing, index, self) => {
        return (
          index ===
          self.findIndex(
            t => t.flavor_text === thing.flavor_text && t.language.name === 'en'
          )
        )
      })
    )

    const descriptions =
      getEngDescriptions.length > 3
        ? getEngDescriptions.slice(0, 3)
        : getEngDescriptions

    getEngDescriptions.length !== 1 &&
      descriptions.sort((a, b) => a.flavor_text.length < b.flavor_text.length)

    const avaibleSprites = sprites.versions

    const getSprites = [
      avaibleSprites['generation-i'].yellow,
      avaibleSprites['generation-ii'].crystal,
      avaibleSprites['generation-iii']['firered-leafgreen'],
      avaibleSprites['generation-iv']['heartgold-soulsilver'],
      avaibleSprites['generation-v']['black-white'],
      avaibleSprites['generation-vi']['x-y'],
      avaibleSprites['generation-vii']['ultra-sun-ultra-moon']
    ]

    const filteredSprites = getSprites.filter(
      item => item.front_default || false
    )

    console.log(filteredSprites)

    return (
      <>
        <SEO
          title={pokemonName}
          description={`Explore all the details about ${pokemonName}, like moves, stats, evolution and more, and also check ${pokemonName} cards`}
        />
        {auth.uid && (
          <Flex
            w="100%"
            pb={10}
            align="center"
            justify={['center', null, null, 'end']}
          >
            <ButtonGroup
              spacing={4}
              direction={['column', 'row']}
              justify={['center', 'end']}
              align="center"
            >
              {this._getPokemonTeamUserButton(pokemonName, stats, id)}
              {this._getPokemonFavoritesUserButton(pokemonName, stats, id)}
            </ButtonGroup>
          </Flex>
        )}

        <Flex flexDir="column" justify="center" align="center">
          <Flex flexDir="row" pb={4} justify="center" align="center">
            <Image
              mr={4}
              w={12}
              h={12}
              objectFit="contain"
              alt={`${pokemonName} Miniature`}
              src={sprites.versions['generation-vii'].icons.front_default}
            />
            <Heading as="h1">{pokemonName}</Heading>
          </Flex>
          <Flex flexWrap="wrap" justify="center" gridGap={4} fontSize={12}>
            {Array.from(uniqueNames).map((uniqueNameItem, key) => (
              <Text fontStyle="italic" key={key}>
                {uniqueNameItem}
              </Text>
            ))}
          </Flex>
        </Flex>

        <Box pt={20} pb={8}>
          <SimpleGrid
            columns={[1, null, null, 2]}
            gridGap={8}
            alignItems="center"
          >
            <Image
              mx="auto"
              objectFit="contain"
              w="80%"
              h="auto"
              fallback={true}
              alt={pokemonName}
              src={sprites.other['official-artwork'].front_default}
            />
            <Box py={8}>
              <Heading as="h4" pb={8} textAlign="center">
                {getEngDescriptions.length === 1
                  ? 'Description'
                  : getEngDescriptions.length === 2 ||
                    getEngDescriptions.length === 3
                  ? 'Descriptions'
                  : 'Random Descriptions'}
              </Heading>
              <SimpleGrid columns={1} gridGap={8}>
                {descriptions.map((item, index) => (
                  <Box key={index}>
                    <Text>{item.flavor_text}</Text>
                    <Text fontStyle="italic" mt={3} fontSize={12}>
                      Pokémon {_.startCase(item.version.name)}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </SimpleGrid>
        </Box>

        <Box py={10}>
          <Heading as="h3" pb={10} textAlign="center">
            Game Sprites
          </Heading>
          <Flex
            bg="#fff"
            borderRadius="6px"
            flexWrap="wrap"
            gridGap={8}
            boxShadow="md"
            justify="center"
            p={8}
          >
            {filteredSprites.map((sprite, index) => {
              const url = new URL(sprite.front_default)
              const getInstancesOfUrl = url.pathname.split('/')
              const getGeneration = getInstancesOfUrl[7]

              return sprite.front_default ? (
                <React.Fragment key={index}>
                  <Image
                    w="100px"
                    h="100px"
                    objectFit={
                      getGeneration === 'generation-vii' ? 'none' : 'contain'
                    }
                    alt={`${pokemonName} sprite generation - ${getGeneration}`}
                    src={sprite.front_default}
                  />
                  {sprite.front_shiny && (
                    <Image
                      w="100px"
                      h="100px"
                      objectFit={
                        getGeneration === 'generation-vii' ? 'none' : 'contain'
                      }
                      alt={`${pokemonName} sprite - generation ${getGeneration}`}
                      src={sprite.front_shiny}
                    />
                  )}
                </React.Fragment>
              ) : null
            })}
          </Flex>
        </Box>

        <Box py={10}>
          <Heading as="h3" textAlign="center">
            General Info
          </Heading>
          <PokemonPageGenericInfo pokemonInfo={pokemonInfo} />
        </Box>

        <Box py={10} w="100%">
          <Heading as="h3" pb={14} textAlign="center">
            Evolution Chain
          </Heading>
          <PokemonPageEvChain
            evChainData={pokemonEvChainInfo}
            hasFormsOrMegaEv={forms_switchable}
            formInfo={pokemonAlternateFormInfo}
          />
        </Box>

        {pokemonAlternateFormInfo && (
          <Box py={10} w="100%">
            <Box pb={14}>
              <Heading as="h3" pb={2} textAlign="center">
                Alternative Forms*
              </Heading>
              <Text fontStyle="italic" fontSize={12} textAlign="center">
                *can contain special forms, mega evolutions and/or dynamax forms
              </Text>
            </Box>

            {pokemonAlternateFormInfo.map((pokemon, index) => (
              <React.Fragment key={index}>
                <PokemonPageAlternateForms pokemonInfo={pokemon} key={index} />
                {_.add(index, 1) !== pokemonAlternateFormInfo.length && (
                  <Divider my={12} orientation="horizontal" />
                )}
              </React.Fragment>
            ))}
          </Box>
        )}

        <Box py={10} w="100%">
          <Heading as="h3" pb={14} textAlign="center">
            Moves
          </Heading>

          <Box bgColor="#ebebd3" p={8} borderRadius={4}>
            <Tabs
              isLazy
              variant="soft-rounded"
              colorScheme="red"
              index={this.state.activeTab}
              defaultIndex={0}
            >
              <TabList
                w="100%"
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
                gridGap={8}
              >
                {movesArray.map((item, key) => (
                  <Tab
                    key={key}
                    onClick={() => this._toggleTab([key, item.value])}
                  >
                    <Icon mr={2} as={item.icon} />
                    <Text fontSize={20}>{item.name}</Text>
                  </Tab>
                ))}
              </TabList>
              <TabPanels color="#3c3c3b">
                {movesArray.map((item, key) => (
                  <TabPanel pt={9} key={key}>
                    <PokemonPageMoves
                      pokemonMoves={moves}
                      method={item.value}
                    />
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </Box>
        </Box>

        <Box pt={10} pb={16}>
          <Heading pb={14} as="h3" textAlign="center">
            Cards
          </Heading>

          <Flex flexWrap="wrap" gridGap={8} justify="center">
            {cards.map((item, index) => (
              <Flex align="center" justify="center" key={index}>
                <Image w="70%" h="auto" src={item.imageUrl} />
              </Flex>
            ))}
          </Flex>
          <Flex justify="center" pt={10}>
            {cards.length !== pokemonCards.length && (
              <Button
                onClick={() =>
                  this.setState({
                    cards: cards.concat(
                      pokemonCards.slice(
                        cards.length,
                        cards.length + cardsShown
                      )
                    )
                  })
                }
                leftIcon={<FaPlus />}
                colorScheme="blue"
              >
                Show more
              </Button>
            )}
          </Flex>
        </Box>

        <PokemonPageNextPrevious
          pokemonId={pokemonInfo[0].id}
          pokemonName={pokemonName}
        />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    pokemonInfo: state.apiCalls.apiData.getPokemon,
    pokemonEvChainInfo: state.apiCalls.apiData.getEvChain,
    pokemonCards: state.apiCalls.apiData.getPokemonCards,
    pokemonAlternateFormInfo: state.apiCalls.apiData.getAlternateForms,
    profilePokemonTeam: state.firebase.profile.favoriteTeam,
    profilePokemonFavorites: state.firebase.profile.favoritePokemons
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addFavoritePokemon: pokemon => dispatch(addFavoritePokemon(pokemon)),
    removeFavoritePokemon: pokemon => dispatch(removeFavoritePokemon(pokemon)),
    addPokemonToTeam: pokemon => dispatch(addPokemonToTeam(pokemon)),
    removePokemonFromTeam: pokemon => dispatch(removePokemonFromTeam(pokemon))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PokePage)
