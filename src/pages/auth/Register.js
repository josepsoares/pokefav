import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from 'redux/actions/userActions'
import {
  Text,
  Flex,
  SimpleGrid,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  Select,
  Avatar,
  CircularProgress,
  Box,
  IconButton,
  HStack,
  Icon
} from '@chakra-ui/react'
import Button from 'components/layout/Button'
import { BiAt, BiKey, BiUserCircle, BiLowVision, BiShow, BiIdCard } from 'react-icons/bi'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import _ from 'lodash'
import { FaUser } from 'react-icons/fa'
import { CgPokemon } from 'react-icons/cg'

// src={`https://www.serebii.net/diamondpearl/avatar/${item}.png`}

const Register = props => {
  const [state, setState] = useState({
    games: [],
    regions: []
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const urls = [
      `https://pokeapi.co/api/v2/version-group/`,
      `https://pokeapi.co/api/v2/region/`
    ]

    const getRegionsAndGames = async () => {
      const returnRegionsAndGames = await Promise.all(
        urls.map(async url => {
          try {
            const getRequest = await fetch(url)
            const getDataRequest = await getRequest.json()
            return getDataRequest.results
          } catch (err) {
            return err.message
          }
        })
      )
      setState({
        ...state,
        games: returnRegionsAndGames[0],
        regions: returnRegionsAndGames[1]
      })
      setLoading(false)
    }

    getRegionsAndGames()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const avatarHumans = [
    'ace-f',
    'ace-m',
    'artist-f',
    'beauty',
    'butler',
    'fisherman',
    'furisode-girl',
    'guitarist',
    'hex-maniac',
    'hiker',
    'lady',
    'punk-f',
    'punk-m',
    'ranger-f',
    'ranger-m',
    'rich-m'
  ]

  const avatarPokemons = [
    'bidoof',
    'cleffa',
    'ditto',
    'eevee',
    'growlithe',
    'jigglypuff',
    'meowth',
    'mimikyu',
    'pikachu',
    'psyduck',
    'skitty',
    'slakoth'
  ]

  const RegisterSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('You must type your email to proceed'),
    username: Yup.string()
      .min(4, 'Username must have more than 4 characters')
      .max(14, 'Username must have less than 14 characters')
      .matches(
        /^[a-zA-Z0-9]{4,12}$/,
        'The username must not contain any special characters'
      )
      .required('You must type your username to proceed'),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'The password nust contain 8 characters, one number and one special character'
      )
      .required('You must type your password to proceed'),
    reEnterPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('You must type your password again to proceed'),
    avatar: Yup.string().required('You must choose one avatar to proceed'),
    favoriteRegion: Yup.string(),
    favoriteGame: Yup.string()
  })

  const { games, regions } = state
  const dispatch = useDispatch()
  /* _.startCase(item.name) */

  return (
    <Flex flexDir="column" justify="center">
      <Heading textAlign="center" as="h1" pb={10}>
        Create an account now
      </Heading>

      <Box bg="#ebebd3" color="#3c3c3b" p={[8, 10]} borderRadius="10px">
        <Formik
          validationSchema={RegisterSchema}
          initialValues={{
            email: '',
            username: '',
            password: '',
            reEnterPassword: '',
            favoriteGame: '',
            favoriteRegion: '',
            avatar: ''
          }}
          onSubmit={(values, actions) => {
            if (values.avatar === '') {
              actions.setFieldError(
                'avatar',
                'You must choose an avatar in order to register'
              )
            } else {
              actions.setFieldError('avatar', false)
              dispatch(signUp(values))
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box textAlign="center" pb={8}>
                <Heading as="h4">1. Fill the required info</Heading>
                <Text>
                  All the fields that contain a <b>*</b> are required in order
                  to submit the register requisition
                </Text>
              </Box>
              <SimpleGrid columns={1} gridGap={10}>
                <SimpleGrid
                  columns={[1, null, 2]}
                  spacingX={[0, null, 12]}
                  spacingY={6}
                >
                  <Field name="email" type="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <InputGroup>
                          <InputLeftElement
                            p={0}
                            pointerEvents="none"
                            children={<BiAt px={2} />}
                          />
                          <Input
                            {...field}
                            id="email"
                            borderColor="#1688b9"
                            placeholder="Type your email*"
                            _hover={{
                              borderColor: 'blue.300'
                            }}
                          />
                        </InputGroup>
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="username" type="text">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
                      >
                        <InputGroup>
                          <InputLeftElement
                            p={0}
                            pointerEvents="none"
                            children={<BiUserCircle px={2} />}
                          />
                          <Input
                            {...field}
                            id="email"
                            borderColor="#1688b9"
                            placeholder="Type your username*"
                            _hover={{
                              borderColor: 'blue.300'
                            }}
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password" type="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <InputGroup>
                          <InputLeftElement
                            p={0}
                            pointerEvents="none"
                            children={<BiKey px={2} color="gray.300" />}
                          />
                          <Input
                            {...field}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            borderColor="#1688b9"
                            placeholder="Type your password"
                            transition="all ease-in-out 0.3s"
                            _hover={{
                              borderColor: 'blue.300'
                            }}
                            _active={{
                              borderColor: 'blue.300'
                            }}
                          />
                          <InputRightElement width="4.5rem">
                            <IconButton
                              variant="transparent"
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShowPassword(!showPassword)}
                              icon={showPassword ? <BiShow /> : <BiLowVision />}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="reEnterPassword" type="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.reEnterPassword &&
                          form.touched.reEnterPassword
                        }
                      >
                        <InputGroup>
                          <InputLeftElement
                            p={0}
                            pointerEvents="none"
                            children={<BiKey px={2} color="gray.300" />}
                          />
                          <Input
                            {...field}
                            id="reenter-password"
                            type={showRePassword ? 'text' : 'password'}
                            borderColor="#1688b9"
                            placeholder="Type your password again"
                            transition="all ease-in-out 0.3s"
                            _hover={{
                              borderColor: 'blue.300'
                            }}
                            _active={{
                              borderColor: 'blue.300'
                            }}
                          />
                          <InputRightElement width="4.5rem">
                            <IconButton
                              variant="transparent"
                              h="1.75rem"
                              size="sm"
                              onClick={() => setShowRePassword(!showRePassword)}
                              icon={
                                showRePassword ? <BiShow /> : <BiLowVision />
                              }
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.reEnterPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {isLoading ? (
                    <CircularProgress isIndeterminate color="green.300" />
                  ) : (
                    <Field name="favoriteGame" type="text">
                      {({ field }) => (
                        <FormControl>
                          <Select
                            {...field}
                            borderColor="#1688b9"
                            id="favoriteGame"
                            _hover={{
                              borderColor: 'blue.300'
                            }}
                            isDisabled={!games?.length}
                            placeholder={
                              !games?.length
                                ? "We weren't able pokémon games from the API"
                                : 'Select your favorite game'
                            }
                          >
                            {games?.length &&
                              games.map((item, index) => (
                                <option key={index} value={item.name}>
                                  {_.startCase(item.name)}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  )}
                  {isLoading ? (
                    <CircularProgress isIndeterminate color="green.300" />
                  ) : (
                    <Field name="favoriteRegion" type="text">
                      {({ field }) => (
                        <FormControl>
                          <Select
                            {...field}
                            borderColor="#1688b9"
                            id="favoriteRegion"
                            _hover={{
                              borderColor: 'blue.300'
                            }}
                            isDisabled={!regions?.length}
                            placeholder={
                              !regions?.length
                                ? "We weren't able to get pokémon regions from the API"
                                : 'Select your favorite region'
                            }
                          >
                            {regions?.length &&
                              regions.map((item, index) => (
                                <option key={index} value={item.name}>
                                  {_.startCase(item.name)}
                                </option>
                              ))}
                          </Select>
                        </FormControl>
                      )}
                    </Field>
                  )}
                </SimpleGrid>

                <Box w="100%">
                  <Field name="avatar" type="text">
                    {({ field, form }) => (
                      <FormControl>
                        <Heading as="h4" textAlign="center" pb={8}>
                          2. Chose your avatar*
                        </Heading>
                        <HStack
                          pb={10}
                          spacing={4}
                          align="center"
                          justify="center"
                          color="#3c3c3b"
                        >
                          <FaUser size="1rem" />
                          <Heading
                            pb={0}
                            as="h6"
                            color="#3c3c3b"
                            fontSize="1.5rem"
                            textAlign="center"
                          >
                            Human Avatars
                          </Heading>
                        </HStack>

                        <SimpleGrid
                          columns={[1, 2, 3, 6]}
                          placeItems="center"
                          align="center"
                          gridGap={10}
                        >
                          {avatarHumans.map((item, index) => {
                            const isAvatarSelected = field.value === item

                            return (
                              <Avatar
                                key={index}
                                boxSize={32}
                                alt={item}
                                boxShadow="md"
                                transitionProperty="all"
                                transition="ease-in-out"
                                transitionDuration="0.5s"
                                opacity={isAvatarSelected ? 1 : 0.65}
                                bg={isAvatarSelected ? '#ffe066' : '#1688b9'}
                                src={`/img/avatars/avatar-${item}.png`}
                                _active={{
                                  opacity: 1
                                }}
                                _hover={{
                                  opacity: 1
                                }}
                                onClick={() =>
                                  form.setValues({
                                    ...form.values,
                                    avatar: item
                                  })
                                }
                              />
                            )
                          })}
                        </SimpleGrid>
                        <HStack
                          pt={14}
                          pb={10}
                          spacing={4}
                          align="center"
                          justify="center"
                          color="#3c3c3b"
                        >
                          <CgPokemon size="1.4rem" />
                          <Heading
                            pb={0}
                            as="h5"
                            color="#3c3c3b"
                            fontSize="1.5rem"
                            textAlign="center"
                          >
                            Pokémon Avatars
                          </Heading>
                        </HStack>

                        <SimpleGrid
                          columns={[1, 2, 3, 6]}
                          placeItems="center"
                          align="center"
                          gridGap={10}
                        >
                          {avatarPokemons.map((item, index) => {
                            const isAvatarSelected = field.value === item

                            return (
                              <Avatar
                                key={index}
                                boxSize={32}
                                alt={item}
                                boxShadow="md"
                                transitionProperty="all"
                                transition="ease-in-out"
                                transitionDuration="0.5s"
                                opacity={isAvatarSelected ? 1 : 0.65}
                                bg={isAvatarSelected ? '#ffe066' : '#1688b9'}
                                src={`/img/avatars/avatar-${item}.png`}
                                _active={{
                                  opacity: 1
                                }}
                                _hover={{
                                  opacity: 1
                                }}
                                onClick={() =>
                                  form.setValues({
                                    ...form.values,
                                    avatar: item
                                  })
                                }
                              />
                            )
                          })}
                        </SimpleGrid>
                        <FormErrorMessage>
                          {form.errors.avatar}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </Box>
              </SimpleGrid>
              <Flex pt={20} justify="center">
                <Button
                  w={['80%', '60%', '40%']}
                  bg="secondary"
                  type="submit"
                  isLoading={props.isSubmitting}
                  isDisabled={props.isSubmitting}
                  rightIcon={<Icon as={BiIdCard} />}
                >
                  Register
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  )
}

export default Register
