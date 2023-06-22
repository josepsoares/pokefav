<template></template>

<!-- 
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFirestore } from 'redux-firestore';
import { getUser } from 'redux/actions/userActions';

import { Link } from 'react-router-dom';

import {
  Flex,
  SimpleGrid,
  Stack,
  Input,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Box,
  Avatar
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';

import Error from 'components/feedback/Error';
import Loading from 'components/feedback/Loading';
import SEO from 'components/Seo';

const PokemonTrainers = props => {
  const [state, setState] = useState({
    resultsPerFetch: 12,
    isLoading: false,
    isLoadingSearch: false,
    errorSearch: false,
    error: false,
    listRecentUsers: [],
    listBestIQ: [],
    listSerchedUsers: [],
    searchInputValue: ''
  });

  const {
    resultsPerFetch,
    isLoading,
    error,
    isLoadingSearch,
    errorSearch,
    listRecentUsers,
    listBestIQ,
    listSerchedUsers,
    searchInputValue
  } = state;

  const methodNameOptions = [
    { value: 'asc', label: 'Ascendant' },
    { value: 'desc', label: 'Descendant' }
  ];

  const dispatch = useDispatch();
  const db = getFirestore();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUsers = async () => {
    setState({ ...state, isLoading: true });
    const recentUsersArr = [];
    const bestIQUsersArr = [];

    const requestRecentUsers = db
      .collection('users')
      .limit(resultsPerFetch)
      .orderBy('createdAt', 'desc');

    const requestBestIQUsers = db
      .collection('users')
      .limit(resultsPerFetch)
      .orderBy('pokemonIQLvl', 'asc')
      .orderBy('overallScore', 'desc');

    try {
      const getUsersRequest = await requestRecentUsers.get();
      getUsersRequest.docs.forEach(doc => {
        let { username, avatar, level, statute } = doc.data();
        recentUsersArr.push({ key: doc.id, username, avatar, level, statute });
      });

      const getBestIQUsers = await requestBestIQUsers.get();
      getBestIQUsers.docs.forEach(doc => {
        let { username, avatar, level, statute } = doc.data();
        bestIQUsersArr.push({ key: doc.id, username, avatar, level, statute });
      });

      setState({
        ...state,
        listRecentUsers: recentUsersArr,
        listBestIQ: bestIQUsersArr,
        isLoading: false
      });
    } catch (err) {
      setState({ ...state, error: err.message });
    }
  };

  const getUserFromSearchInput = async () => {
    setState({ ...state, isLoadingSearch: true });
    const usersArr = [];

    const reqSearchUsers = db
      .collection('users')
      .where(resultsPerFetch)
      .orderBy('createdAt', 'desc');

    try {
      const getSearchUsers = await reqSearchUsers.get();
      getSearchUsers.docs.forEach(doc => {
        let { username, avatar, level, statute } = doc.data();
        usersArr.push({ key: doc.id, username, avatar, level, statute });
      });

      usersArr.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));

      setState({
        ...state,
        listSerchedUsers: usersArr,
        isLoading: false
      });
    } catch (err) {
      setState({ ...state, errorSearch: err.message });
    }
  };

  const handleSearchInputChange = event => {
    const { value } = event.target;

    if (value !== '') {
      getUserFromSearchInput();
    }
  };

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
      </Flex>

      <Flex>
        <SimpleGrid>
          {listRecentUsers.map((item, index) => (
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
      </Flex>

      <Flex>
        <SimpleGrid>
          {listBestIQ.map((item, index) => (
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
      </Flex>

      <Flex>
        <Heading>
          Can't find a friend of yours? Just type their name in the input bellow
          to discover their profile!
        </Heading>
        <Stack spacing={4} w="100%" direction="column">
          <FormControl id="pokemon-name">
            <FormLabel>PokéTrainer Username</FormLabel>
            <Input
              borderRadius="4px"
              type="text"
              bg="white"
              placeholder="pokémon name"
              onChange={handleSearchInputChange}
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
        </Stack>
        <SimpleGrid>
          {isLoadingSearch ? (
            <p>loading...</p>
          ) : listSerchedUsers.length === 0 && searchInputValue === '' ? (
            <div>teste</div>
          ) : listSerchedUsers.length === 0 ? (
            <div>outro teste </div>
          ) : (
            listSerchedUsers.map((item, index) => (
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
            ))
          )}
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default PokemonTrainers;

 -->
