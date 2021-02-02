import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { getUserAndPokemonForProfileIQ } from 'redux/actions/apiActions'
import {
  Flex,
  SimpleGrid,
  Stack,
  Input,
  Image,
  Heading,
  Text
} from '@chakra-ui/react'
import Select from 'react-select'

import Error from 'components/feedback/Error'
import { getFirestore } from 'redux-firestore'
import Loading from 'components/feedback/Loading'

const PokemonTrainers = props => {
  const [state, setState] = useState({
    resultsPerPage: 12,
    isLoading: false,
    error: false,
    totalUsers: null,
    list: [],
    ref: null,
    lastUser: null,
    filterType: '',
    filterMethod: '',
    disposition: 'items'
  })

  const dispatch = useDispatch()
  const db = getFirestore()
  const {
    list,
    isLoading,
    error,
    totalUsers,
    filterType,
    filterMethod,
    disposition
  } = state
  const profile = useSelector(state => state.firebase.profile)

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

  const getAllUsersLength = async () => {
    try {
      const getTotatUsers = await db.collection('counters').doc('users').get()
      const requestNumber = getTotatUsers.data()
      return { usersLength: requestNumber.number }
    } catch (err) {
      return { err: err }
    }
  }

  const fetchMoreData = () => {
    let numberOfUsersToRequest
    let addNextUsers = []
    const { lastUser, ref, resultsPerPage, filterType } = state
    const thresholdOfUsers = totalUsers - resultsPerPage

    if (list.length > thresholdOfUsers) {
      numberOfUsersToRequest = list.length - resultsPerPage
    } else {
      numberOfUsersToRequest = resultsPerPage
    }

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

    try {
      const getUsersRequest = await requestUsers.limit(resultsPerPage).get()
      let lastVisible = getUsersRequest.docs[getUsersRequest.docs.length - 1]
      getUsersRequest.docs.forEach(doc => {
        let { username, avatar, level, statute } = doc.data()
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
      setState({ ...state, error: err.message })
    }
  }

  const typeOptions = [
    { value: 'createdAt', label: 'Creation Date' },
    { value: 'username', label: 'Name' },
    { value: 'triviaPokemon', label: 'Trivia Pokémon' }
  ]

  const methodOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' }
  ]

  const methodNameOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' },
    { value: 'writeUsername', label: 'Write Name' }
  ]

  const methodTriviaOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' },
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' }
  ]

  console.log(error)

  return (
    <>
      <Flex
        flexDir={['column', null, 'row']}
        justify={['center', null, 'space-between']}
        align="center"
      >
        <Heading as="h1" pb={10}>
          PokéTrainers
        </Heading>

        <Stack direction={['column', null, 'row']} spacing={4}>
          <Select
            options={typeOptions}
            isClearable={true}
            isSearchable={false}
            placeholder="Selecione a forma de filtrar"
            classNamePrefix="react-select"
            aria-label="Menu de formas de filtragem"
            aria-labelledby="Formas de filtragem"
            onChange={(ev, { action }) =>
              updateFilter(ev, { action }, 'filterType')
            }
          />

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

          {filterMethod === 'writeName' && <Input></Input>}
        </Stack>
      </Flex>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <p>
          Ocorreu um erro no pedido dos utilizadores à base de dados, tente
          novamente atualizando a página via <i>browser</i>!
        </p>
      ) : (
        <InfiniteScroll
          dataLength={list.length}
          next={() => fetchMoreData()}
          hasMore={list.length >= totalUsers ? false : true}
          loader={<Loading />}
        >
          <SimpleGrid columns={[2, 4]}>
            {list.map((item, index) => (
              <Link
                key={index}
                className="containerLink py-2"
                onClick={() =>
                  dispatch(getUserAndPokemonForProfileIQ(item.username))
                }
                to={`/pokemon-trainers/profile/${item.username}`}
              >
                <Flex textAlign="center" flexDir="row" align="center">
                  <Image
                    alt={item.avatar}
                    src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`}
                  />
                  <Text>{item.username}</Text>
                  <Text>{item.nationality}</Text>
                  <Text>{item.gender}</Text>
                </Flex>
              </Link>
            ))}
          </SimpleGrid>
        </InfiniteScroll>
      )}
    </>
  )
}

export default PokemonTrainers
