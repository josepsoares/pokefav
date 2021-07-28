import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFirestore } from 'redux-firestore'
import { getUser } from 'redux/actions/userActions'

import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Select from 'react-select'
import _ from 'lodash'

import {
  Flex,
  SimpleGrid,
  Stack,
  Input,
  Heading,
  Text,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  FormControl,
  FormLabel,
  CloseButton,
  Box,
  Avatar
} from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'

import Error from 'components/feedback/Error'
import Loading from 'components/feedback/Loading'
import SEO from 'components/Seo'
import Button from 'components/layout/Button'
import useWindowSize from 'utils/hooks/useWindowSize'

const PokemonTrainers = props => {
  const [state, setState] = useState({
    resultsPerPage: 12,
    isLoading: false,
    error: false,
    totalUsers: null,
    list: [],
    ref: null,
    lastUser: null,
    hasMore: true,
    filterType: 'createdAt',
    typeSearch: 'date',
    selectValue: 'national',
    selectList: '',
    disposition: 'items'
  })

  const {
    list,
    isLoading,
    error,
    totalUsers,
    filterType,
    hasMore,
    typeSearch,
    selectValue,
    selectList,
    filterMethod
  } = state

  const dispatch = useDispatch()
  const db = getFirestore()

  const profile = useSelector(state => state.firebase.profile)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const drawerBtnRef = useRef()
  const { width } = useWindowSize()

  useEffect(() => {
    getUsers(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (state.filterMethod !== '') {
      getUsers(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.filterMethod])

  const getUsers = async isFirstRender => {
    setState({ ...state, isLoading: true })
    let requestUsers
    const userList = []
    const { resultsPerPage, filterType, filterMethod } = state

    if (filterType) {
      if (filterMethod && (filterMethod === 'desc' || filterMethod === 'asc')) {
        requestUsers = db
          .collection('users')
          .orderBy(`${filterType}`, `${filterMethod}`)
      }
    } else {
      requestUsers = db.collection('users').orderBy('createdAt', 'desc')
    }

    console.log(resultsPerPage)

    try {
      const getUsersRequest = await requestUsers.limit(resultsPerPage).get()
      let lastVisible = getUsersRequest.docs[getUsersRequest.docs.length - 1]
      getUsersRequest.docs.forEach(doc => {
        let { username, avatar, level, statute } = doc.data()
        console.log(username, avatar)
        userList.push({ key: doc.id, username, avatar, level, statute })
      })

      if (filterType === 'username') {
        userList.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
      }

      if (isFirstRender) {
        const totalUsers = await getAllUsersLength()
        totalUsers?.usersLength
          ? setState({
              ...state,
              ref: requestUsers,
              list: userList,
              lastUser: lastVisible,
              isLoading: false,
              totalUsers: totalUsers.usersLength
            })
          : setState({ ...state, error: totalUsers?.err })
      } else {
        setState({
          ...state,
          ref: requestUsers,
          list: userList,
          lastUser: lastVisible,
          isLoading: false
        })
      }
    } catch (err) {
      console.log(err)
      setState({ ...state, error: err.message })
    }
  }

  const getAllUsersLength = async () => {
    try {
      const getTotatUsers = await db.collection('counters').doc('users').get()
      const requestNumber = getTotatUsers.data()
      return { usersLength: requestNumber.number }
    } catch (err) {
      console.log(err)
      return { err: err }
    }
  }

  const fetchMoreData = () => {
    let numberOfUsersToRequest
    let addNextUsers = []
    const { lastUser, ref, resultsPerPage, filterType } = state
    const thresholdOfUsers = totalUsers - resultsPerPage

    console.log(thresholdOfUsers)

    if (list.length > thresholdOfUsers) {
      numberOfUsersToRequest = resultsPerPage - list.length
    } else {
      numberOfUsersToRequest = resultsPerPage
    }
    console.log(numberOfUsersToRequest)
    console.log(state)

    ref
      .startAfter(lastUser)
      .limit(numberOfUsersToRequest)
      .get()
      .then(documentSnapshots => {
        let lastVisible =
          documentSnapshots.docs[documentSnapshots.docs.length - 1]
        documentSnapshots.forEach(doc => {
          let { username, avatar, level, statute } = doc.data()
          addNextUsers.push({ key: doc.id, username, avatar, level, statute })
        })

        if (filterType === 'username') {
          addNextUsers.sort((a, b) =>
            a.toLowerCase().localeCompare(b.toLowerCase())
          )
        }

        setState({
          ...state,
          list: state.list.concat(addNextUsers),
          lastUser: lastVisible
        })
      })
      .catch(err => setState({ ...state, error: err }))
  }

  const updateFilter = (ev, { action }, filter) => {
    if (action === 'clear' && filter === 'filterMethod') {
      setState({ ...state, [filter]: null })
      getUsers()
    } else if (filter === 'filterType' && state.filterMethod !== '') {
      setState({ ...state, filterType: ev?.value, filterMethod: '' })
    } else {
      setState({ ...state, [filter]: ev?.value ? ev?.value : '' })
    }
  }

  const typeOptions = [
    { value: 'createdAt', label: 'Creation date' },
    { value: 'username', label: 'Username' },
    { value: 'triviaPokemon', label: 'Minigames score' }
  ]

  const methodOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' }
  ]

  const methodNameOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' }
  ]

  const methodTriviaOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' },
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' }
  ]

  const handleSearchChange = event => {
    /* const { value } = event.target
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
        //items: calculatePage(pokemonSearched, 1),
        currentIndex: 1,
        searchPokemon: pokemonSearched
      })
    } else {
      setState({
        ...state,
        //items: calculatePage(allPokedexEntries, 1),
        currentIndex: 1,
        searchPokemon: ''
      })
    } */
  }

  const handleSelectChange = async (value, action) => {
    setState({
      ...state,
      isLoading: true
    })

    /* if (action.name === 'typeSearch') {
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
      } */

    /* const getItems = calculatePage(filterAllPokedexEntries, 1)

      setState({
        ...state,
        currentIndex: 1,
        items: getItems,
        allPokedexEntries: filterAllPokedexEntries,
        selectValue: value.value,
        isLoading: false
      })
    }*/
  }

  let optionsSelectSpecifics = []

  for (let item of state.selectList) {
    optionsSelectSpecifics.push({
      value: item.name,
      label: _.startCase(item.name)
    })
  }

  console.log('condition to more =>', list.length >= totalUsers ? false : true)

  return (
    <>
      <SEO
        title="PokéTrainers"
        description="Explore all the users of the PokéFav website"
      />

      <Flex
        flexDir={['column', null, 'row']}
        justify={['center', null, 'space-between']}
        align="center"
        pb={[12, 16]}
      >
        <Heading as="h1" pb={[4, null, 0]}>
          PokéTrainers
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
        <Error
          message="Ocorreu um erro no pedido dos utilizadores à base de dados, tente
        novamente atualizando a página via <i>browser</i>!"
        />
      ) : (
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          hasMore={list.length >= totalUsers ? false : true}
          endMessage={
            <Text>You have seen all the PokéTrainers in PokéFav</Text>
          }
        >
          <SimpleGrid
            columns={[2, 3, null, 4]}
            gridGap={6}
            align="center"
            justify="center"
          >
            {list.map((item, index) => (
              <Link
                key={index}
                onClick={() => dispatch(getUser(item.username))}
                to={`/pokemon-trainers/profile/${item.username}`}
              >
                <Box className="user-avatar">
                  <Avatar
                    mb={4}
                    objectFit="scale-down"
                    bg="#1688b9"
                    boxShadow="md"
                    boxSize={32}
                    alt={item.avatar}
                    transitionProperty="all"
                    transition="ease-in-out"
                    transitionDuration="0.5s"
                    src={`/img/avatars/avatar-${item.avatar}.png`}
                  />
                  <Text>{item.username}</Text>
                </Box>
              </Link>
            ))}
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
                  Search PokéTrainers
                </Heading>
                <CloseButton onClick={onClose} />
              </Flex>
              <Stack spacing={4} w="100%" direction="column">
                <FormControl id="pokemon-name">
                  <FormLabel>PokéTrainer Username</FormLabel>
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
                    options={typeOptions}
                    placeholder="method to sort by"
                    isSearchable={false}
                  />
                </FormControl>
                <Select
                  isDisabled={!state.filterType ? true : false}
                  options={
                    filterType === 'username'
                      ? methodNameOptions
                      : filterType === 'trivia'
                      ? methodTriviaOptions
                      : methodOptions
                  }
                  isClearable={true}
                  isSearchable={false}
                  placeholder="Selecione o método de filtragem"
                  classNamePrefix="react-select"
                  aria-label="Menu de métodos de filtragem"
                  aria-labelledby="Método de filtragem"
                  onChange={(ev, { action }) => {
                    updateFilter(ev, { action }, 'filterMethod')
                  }}
                />
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default PokemonTrainers
