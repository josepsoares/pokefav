import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'
import Loading from 'components/feedback/Loading'
import { getInfoPokemonPage } from 'redux/actions/apiActions'
import _ from 'lodash'
import {
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure
} from '@chakra-ui/react'
import Error from 'components/feedback/Error'
import PokemonImage from 'components/layout/PokemonImage'
import { FaSearch } from 'react-icons/fa'

// import Button from 'components/layout/Button'
import { useWindowSize } from 'react-use'
import { getDataPokeListPage } from 'redux/actions/apiActions'
import SEO from 'components/Seo'

const PokemonList = () => {
  // const { getInfoPokemonPage, match } = this.props
  const dispatch = useDispatch()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { width } = useWindowSize()

  const pokedexEntries = useSelector(state => state.apiCalls.apiData.getPokedex)
  const pokedexEntriesSlice = pokedexEntries.slice(0, 808)
  const regions = useSelector(
    state => state.apiCalls.apiData.getPokedexDropdowns.regions
  )
  const types = useSelector(
    state => state.apiCalls.apiData.getPokedexDropdowns.types
  )

  const [state, setState] = useState({
    allPokedexEntries: pokedexEntriesSlice,
    searchPokemon: '',
    currentIndex: 1,
    resultsPerPage: 24,
    items: [],
    hasMore: true,
    typeSearch: 'region',
    selectValue: 'national',
    selectList: regions,
    isLoading: false,
    error: null
  })

  const { items, typeSearch, selectValue, hasMore, isLoading, error } = state
  const drawerBtnRef = useRef()

  useEffect(() => {
    const { allPokedexEntries } = state
    if (!allPokedexEntries) {
      dispatch(getPokedex('national'))
      dispatch(getDataPokeListPage())
    } else {
      setState({ ...state, items: calculatePage(allPokedexEntries, 1) })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const calculatePage = (caculateResults, index) => {
    const { resultsPerPage } = state
    const indexOfLastResults = index * resultsPerPage
    const indexOfFirstResults = indexOfLastResults - resultsPerPage
    const currentResults = caculateResults.slice(
      indexOfFirstResults,
      indexOfLastResults
    )

    return currentResults
  }

  const fetchMoreData = () => {
    let { currentIndex, allPokedexEntries } = state
    currentIndex = currentIndex += 1
    setState({
      ...state,
      items: state.items.concat(calculatePage(allPokedexEntries, currentIndex)),
      currentIndex: currentIndex
    })
  }

  const getPokedex = async (param, param2) => {
    console.log(param2)
    const url =
      param2 === 'region'
        ? `https://pokeapi.co/api/v2/pokedex/${param}/`
        : `https://pokeapi.co/api/v2/type/${param}/`

    try {
      const pokemonListRequest = await fetch(url)
      const pokemonListData = await pokemonListRequest.json()

      const pokemonsList =
        param2 === 'region'
          ? pokemonListData.pokemon_entries
          : pokemonListData.pokemon

      const setItems = calculatePage(pokemonsList, 1)

      return {
        items: setItems,
        allPokedexEntries: pokemonsList
      }
    } catch (error) {
      setState({ ...state, error: error.message, isLoading: false })
    }
  }

  const handleSearchChange = event => {
    const { value } = event.target
    const { allPokedexEntries } = state

    if (value !== '') {
      var pokemon
      var pokemonSearched = []
      pokemon = value.toLowerCase()
      for (let pokedexItem of allPokedexEntries) {
        if (
          pokedexItem.pokemon_species.name.startsWith(pokemon) ||
          pokedexItem.pokemon_species.name.includes(pokemon)
        ) {
          pokemonSearched.push(pokedexItem)
        }
      }
      setState({
        ...state,
        items: calculatePage(pokemonSearched, 1),
        currentIndex: 1,
        searchPokemon: pokemonSearched
      })
    } else {
      setState({
        ...state,
        items: calculatePage(allPokedexEntries, 1),
        currentIndex: 1,
        searchPokemon: ''
      })
    }
  }

  const handleSelectChange = async (value, action) => {
    setState({
      ...state,
      isLoading: true
    })

    if (action.name === 'typeSearch') {
      if (value.value === 'region') {
        const getPokedexByRegion = await getPokedex('national', 'region')
        const pokedexEntriesSlice = getPokedexByRegion.allPokedexEntries.slice(
          0,
          808
        )

        setState({
          ...state,
          currentIndex: 1,
          items: getPokedexByRegion.items,
          allPokedexEntries: pokedexEntriesSlice,
          typeSearch: value.value,
          selectList: regions,
          selectValue: 'national',
          isLoading: false
        })
      } else {
        const getPokedexByType = await getPokedex('normal', 'type')

        let filterAllPokedexEntries = getPokedexByType.allPokedexEntries.filter(
          item => {
            if (item.slot !== 2) {
              const splitUrl = item.pokemon.url.split('/')
              return splitUrl[6] < 808
            } else {
              return false
            }
          }
        )

        setState({
          ...state,
          currentIndex: 1,
          items: calculatePage(filterAllPokedexEntries, 1),
          allPokedexEntries: filterAllPokedexEntries,
          typeSearch: value.value,
          selectList: types,
          selectValue: 'normal',
          isLoading: false
        })
      }
    } else {
      const getPokemons = await getPokedex(value.value, state.typeSearch)
      let filterAllPokedexEntries

      if (typeSearch === 'type') {
        filterAllPokedexEntries = getPokemons.allPokedexEntries.filter(item => {
          if (item.slot !== 2) {
            const splitUrl = item.pokemon.url.split('/')
            return splitUrl[6] < 808
          } else {
            return false
          }
        })
      } else if (value.value === 'national') {
        filterAllPokedexEntries = getPokemons.allPokedexEntries.slice(0, 808)
      } else {
        filterAllPokedexEntries = getPokemons.allPokedexEntries
      }

      const getItems = calculatePage(filterAllPokedexEntries, 1)

      setState({
        ...state,
        currentIndex: 1,
        items: getItems,
        allPokedexEntries: filterAllPokedexEntries,
        selectValue: value.value,
        isLoading: false
      })
    }
  }

  let optionsSelectSpecifics = []

  for (let item of state.selectList) {
    optionsSelectSpecifics.push({
      value: item.name,
      label: _.startCase(item.name)
    })
  }

  return (
    <>
      <SEO
        title="Pokémon List"
        description="Search for your favorite pokémons in a vast list of Pokémons"
      />

      <Flex
        flexDir={['column', null, 'row']}
        justify={['center', null, 'space-between']}
        align="center"
        pb={10}
      >
        <Heading pb={[6, null, 0]} as="h1">
          PokéList
        </Heading>

        <Button
          leftIcon={<FaSearch />}
          colorScheme="blue"
          ref={drawerBtnRef}
          onClick={onOpen}
        >
          Search Engine
        </Button>
      </Flex>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={hasMore}
          endMessage={<Text>You have seen all the pokémon available</Text>}
        >
          <SimpleGrid
            columns={[2, 3, 4]}
            gridGap={6}
            align="center"
            justify="center"
          >
            {items.map((pokedexItem, index) => {
              if (
                (typeSearch === 'region' &&
                  pokedexItem.pokemon_species !== undefined) ||
                (typeSearch === 'type' && pokedexItem.pokemon !== undefined)
              ) {
                const url =
                  pokedexItem.pokemon_species !== undefined
                    ? pokedexItem.pokemon_species.url.trim()
                    : pokedexItem.pokemon.url.trim()
                const pokemonNumber = url.split('/')[6]
                const pokemonName =
                  pokedexItem.pokemon_species !== undefined
                    ? pokedexItem.pokemon_species.name
                    : pokedexItem.pokemon.name
                const pokemonNameEdited = _.startCase(pokemonName)

                if (pokemonNumber <= 808) {
                  return (
                    <Link
                      key={index}
                      to={`/pokemon-list/pokemon-page/${pokemonName}`}
                      onClick={() => {
                        dispatch(getInfoPokemonPage(pokemonNumber, pokemonName))
                      }}
                    >
                      <PokemonImage
                        pokemonName={pokemonNameEdited}
                        pokemonNumber={pokemonNumber}
                      />
                    </Link>
                  )
                } else {
                  return null
                }
              } else {
                return null
              }
            })}
          </SimpleGrid>
        </InfiniteScroll>
      )}
      <Drawer
        finalFocusRef={drawerBtnRef}
        onClose={onClose}
        isOpen={isOpen}
        placement="right"
        size={width < 600 ? 'full' : 'md'}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerBody color="#3c3c3b" bgColor="#ebebd3" p={8}>
              <Flex pb={6} justify="space-between" flexDir="row" align="center">
                <Heading as="h3" pb={0}>
                  Search Pokémon
                </Heading>
                <CloseButton onClick={onClose} />
              </Flex>
              <Stack spacing={4} w="100%" direction="column">
                <FormControl id="pokemon-name">
                  <FormLabel>Pokémon Name</FormLabel>
                  <Input
                    borderRadius="4px"
                    type="text"
                    bg="white"
                    placeholder="pokémon name"
                    onChange={handleSearchChange}
                    sx={{
                      borderColor: 'hsl(0,0%,80%)',
                      borderRadius: '4px',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      _hover: {
                        borderColor: 'red.200'
                      }
                    }}
                  />
                </FormControl>

                <FormControl id="sort-by">
                  <FormLabel>Sort By</FormLabel>
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
                    isFullWidth={true}
                    size="md"
                    name="typeSearch"
                    value={{
                      value: typeSearch,
                      label: _.startCase(typeSearch)
                    }}
                    onChange={handleSelectChange}
                    options={[
                      { label: 'Region', value: 'region' },
                      { label: 'Type', value: 'type' }
                    ]}
                    placeholder="method to sort by"
                    isSearchable={false}
                  />
                </FormControl>

                {typeSearch === 'region' && (
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
                  </FormControl>
                )}

                {typeSearch === 'type' && (
                  <FormControl>
                    <FormLabel>Types</FormLabel>
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
                  </FormControl>
                )}
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default PokemonList
