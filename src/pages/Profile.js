import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getInfoPokemonPage } from 'redux/actions/apiActions'
import {
  removeFavoritePokemon,
  removePokemonFromTeam
} from 'redux/actions/userFavoritesActions'
import { editProfileField, getUser, signOut } from 'redux/actions/userActions'

import { Link, useRouteMatch } from 'react-router-dom'
import moment from 'moment'
import _ from 'lodash'

import {
  Box,
  Flex,
  SimpleGrid,
  Image,
  Heading,
  Text,
  Avatar,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonGroup,
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Select,
  Icon
} from '@chakra-ui/react'
import {
  FaArrowRight,
  FaCheck,
  FaEdit,
  FaSignOutAlt,
  FaTimes,
  FaTrashAlt
} from 'react-icons/fa'

import SEO from 'components/Seo'
import avatarsList from 'assets/content/avatarsList'
import getStatsMessages from 'scripts/getMessageFavoritesTeam'
import Button from 'components/layout/Button'
import PokemonImage from 'components/layout/PokemonImage'
import Loading from 'components/feedback/Loading'
import { CgPokemon } from 'react-icons/cg'

const EditableSelect = ({ initialValue, selectList, fieldType }) => {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    isEditing: false,
    value: initialValue
  })

  console.log(selectList)

  return (
    <Flex
      gridGap={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <>
        {state.isEditing ? (
          <Select
            color="#3c3c3b"
            bgColor="#ebebd3"
            defaultValue={state.value}
            onChange={ev => setState({ ...state, value: ev.target.value })}
          >
            {selectList.map((item, index) => (
              <option value={_.startCase(item.name)} key={index}>
                {_.startCase(item.name)}
              </option>
            ))}
          </Select>
        ) : (
          <Text>{state.value}</Text>
        )}
        <EditableControls
          onEdit={() => setState({ ...state, isEditing: true })}
          onCancel={() => setState({ ...state, isEditing: false })}
          isEditing={state.isEditing}
          onSubmit={() => {
            console.log(fieldType, state.value)
            dispatch(editProfileField(fieldType, state.value))
            setState({ ...state, isEditing: false })
          }}
        />
      </>
    </Flex>
  )
}

function EditableControls({ onEdit, isEditing, onSubmit, onCancel }) {
  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        isRound={true}
        colorScheme="green"
        icon={<FaCheck />}
        onClick={onSubmit}
      />
      <IconButton
        isRound={true}
        colorScheme="red"
        icon={<FaTimes />}
        onClick={onCancel}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        transitionProperty="all"
        transition="ease-in-out"
        transitionDuration="0.5s"
        bgColor="secondary"
        color="primary"
        borderRadius="50%"
        size="sm"
        icon={<FaEdit />}
        onClick={onEdit}
        _hover={{
          fontSize: 16
        }}
        _active={{
          fontSize: 16
        }}
      />
    </Flex>
  )
}

const scrollToRef = ref => {
  ref.current.scrollIntoView({ behavior: 'smooth' })
}

const Profile = props => {
  useEffect(() => {
    if (match.params.username !== userInfo.username) {
      dispatch(() => getUser(match.params.username))
    }

    if (isUserLoggedInProfile) {
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
              return err.response.message
            }
          })
        )
        setEditContent({
          games: returnRegionsAndGames[0],
          regions: returnRegionsAndGames[1]
        })
        setLoading(false)
      }

      getRegionsAndGames()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const dispatch = useDispatch()
  const match = useRouteMatch()
  const profile = useSelector(state => state.firebase.profile)
  const getUserInfo = useSelector(state => state.apiCalls.apiData.queryUser)
  const isUserLoggedInProfile = getUserInfo.username === profile.username
  const userInfo = isUserLoggedInProfile ? profile : getUserInfo

  const {
    username,
    createdAt,
    avatar,
    favoriteGame,
    favoriteRegion,
    favoritePokemons,
    favoriteTeam,
    triviaRecord
  } = userInfo

  const messageFavorites = getStatsMessages(
    userInfo.favoritePokemons,
    'favorites'
  )
  const messageTeam = getStatsMessages(userInfo.favoriteTeam, 'team')

  const [editContent, setEditContent] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [avatarModal, setAvatarModal] = useState(false)
  const [chosenAvatar, setChosenAvatar] = useState(avatar)
  const [removePokemonAlert, setRemovePokemonAlert] = useState({
    isOpen: false,
    pokemon: null,
    type: null
  })
  const [showAllFavorites, setShowAllFavorites] = useState(false)

  const pokeFavoriteListRef = useRef(null)
  const pokeTeamRef = useRef(null)

  let averageCorrectAnswers, pokemonIQText

  if (triviaRecord.pokemonIQ) {
    averageCorrectAnswers =
      triviaRecord.correctAnswers /
      (triviaRecord.correctAnswers + triviaRecord.wrongAnswers)
    averageCorrectAnswers *= 100
    averageCorrectAnswers = parseInt(averageCorrectAnswers)

    switch (triviaRecord.pokemonIQ) {
      case 'Magikarp':
        pokemonIQText = `Humm, it seems like ${
          isUserLoggedInProfile ? 'you are' : `${username} is`
        } doing very badly in PokéTrivia, like a Magikarp... Maybe ${
          isUserLoggedInProfile ? 'you' : username
        } just ${
          isUserLoggedInProfile ? 'need' : 'needs'
        } to check the trivia answers on the web or study a little bit to not have the IQ of a Magikarp`
        break
      case 'Slowpoke':
        pokemonIQText = `It seems ${
          isUserLoggedInProfile ? 'you are' : `${username} is`
        }  quite rusty in PokéTrivia Departement, which means ${
          isUserLoggedInProfile ? 'your' : 'their'
        } IQ is the same as a Slowpoke... Gotta remember all those facts or maybe just search the answer on the web to improve this IQ`
        break
      case 'Quagsire':
        pokemonIQText = `Like, ${
          isUserLoggedInProfile ? 'you are' : `${username} is`
        } somewhat oblivious but still your brain at certain times can help you solving PokéTrivias... The thing is this IQ is inconsistent, as a Quagsire! Maybe with a little more attention and work and this IQ might level up!`
        break
      case 'Beheeyem':
        pokemonIQText = `${
          isUserLoggedInProfile ? 'Your' : username
        } IQ is a little bit out of this world like Beheeyem intelligence is not from ours! Such alien intelligence, much wow!`
        break
      case 'Metagross':
        pokemonIQText = `${
          isUserLoggedInProfile ? 'Your' : username
        } IQ in Pokémon Trivia is almost unbelievable matching Metagross's 4 brains said to be superior to a supercomputer! Need to keep up those 4 brains power in Pokémon Trivia!`
        break
      case 'Alakazam':
        pokemonIQText = `${
          isUserLoggedInProfile ? 'Your' : username
        } IQ in Pokémon Trivia is so unbelievable it stands toe to toe with Alakazam, the most intelligent Pokémon in the Pokémon Universe, just wow!`
        break
      default:
        break
    }
  }

  return (
    <>
      <SEO
        title={username}
        description={'Explore the profiles of specifics users from Pokéfav'}
      />

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isUserLoggedInProfile && (
            <Flex pb={8} w="100%" flexDir="row" justify="flex-end">
              <Link
                onClick={() => dispatch(signOut())}
                className="nav-link"
                to={`/profile/edit/${username}`}
              >
                <Box>
                  <FaSignOutAlt size={14} />
                </Box>
                <Box fontSize={16} as="span">
                  Logout
                </Box>
              </Link>
            </Flex>
          )}

          <Flex
            position="relative"
            align="center"
            flexDir="column"
            justify="center"
            pb={10}
          >
            {isUserLoggedInProfile && (
              <IconButton
                transitionProperty="all"
                transition="ease-in-out"
                transitionDuration="0.5s"
                bgColor="secondary"
                color="primary"
                isRound={true}
                icon={<FaEdit />}
                zIndex="3"
                position="absolute"
                top="-0.7rem"
                right="43.5%"
                _hover={{
                  fontSize: 18
                }}
                _active={{
                  fontSize: 18
                }}
                onClick={() => setAvatarModal(true)}
              />
            )}
            <Avatar
              mb={4}
              bg="#1688b9"
              boxShadow="md"
              boxSize={32}
              alt={avatar}
              src={`/img/avatars/avatar-${profile.avatar}.png`}
            />
            <Heading pb={[6, null, 0]} as="h1">
              {username}
            </Heading>
          </Flex>

          <SimpleGrid
            pb={16}
            gridGap={[8, 6]}
            columns={[1, 2, null, 4]}
            textAlign="center"
            justify="center"
            align="center"
          >
            <Box>
              <Heading as="h5" fontSize={20}>
                Signed up at
              </Heading>
              <Text>{moment(createdAt.seconds).format('Do MMMM YYYY')}</Text>
            </Box>
            <Box>
              <Heading as="h5" fontSize={20}>
                Personalities
              </Heading>
              <Text>
                {messageFavorites[0].includes(
                  "You still haven't added any Pokémon"
                )
                  ? 'Unknown'
                  : messageFavorites[0]}
                {'  '}|{'  '}
                {messageTeam[0].includes("You still haven't added any Pokémon")
                  ? 'Unknown'
                  : messageTeam[0]}
              </Text>
            </Box>
            <Box>
              <Heading as="h5" fontSize={20}>
                Favorite Game
              </Heading>
              {isUserLoggedInProfile ? (
                <EditableSelect
                  initialValue={favoriteGame}
                  selectList={editContent.games}
                  fieldType="favoriteGame"
                />
              ) : (
                <Text>{favoriteGame}</Text>
              )}
            </Box>
            <Box>
              <Heading as="h5" fontSize={20}>
                Favorite Region
              </Heading>
              {isUserLoggedInProfile ? (
                <EditableSelect
                  initialValue={favoriteRegion}
                  selectList={editContent.regions}
                  fieldType="favoriteRegion"
                />
              ) : (
                <Text>{favoriteRegion}</Text>
              )}
            </Box>
          </SimpleGrid>

          <Box
            ref={pokeFavoriteListRef}
            w="100%"
            pb={[12, null, 14]}
            textAlign="center"
          >
            <Heading as="h3" pb={favoritePokemons.length !== 0 ? 4 : 10}>
              Favorite Pokémons
            </Heading>
            {favoritePokemons.length !== 0 && (
              <Text fontSize={14} color="grey" fontStyle="italic" pb={10}>
                {isUserLoggedInProfile ? 'You' : 'They'} have{' '}
                <b>{favoritePokemons.length} out of 20</b> possible Pokémons in{' '}
                {isUserLoggedInProfile ? 'your' : 'their'} Favorite Pokémon List
              </Text>
            )}

            {!favoritePokemons.length ? (
              <SimpleGrid
                columns={[1, null, null, 2]}
                justify="center"
                gridGap={6}
              >
                <Box order={[2, null, null, 1]} textAlign="left">
                  <Text pb={2}>
                    {isUserLoggedInProfile
                      ? "You don't"
                      : `${username} doesn't`}{' '}
                    have any Pokémon in their Favorite Pokémons List!
                  </Text>
                  {isUserLoggedInProfile ? (
                    <Text pb={6}>
                      It seems like you lack the caring and sharing spirit of a
                      Chansey! Let it help you filling your Favorite Pokémon
                      List!
                    </Text>
                  ) : (
                    <Text pb={6}>
                      It seems like {username} lacks the caring and sharing
                      spirit of a Chansey!! Hopefully they will get it
                      eventually when they've some Pokémons in their Favorite
                      Pokémon List...
                    </Text>
                  )}
                  {isUserLoggedInProfile && (
                    <Flex justify="center" flexDir="row">
                      <Link to="/pokemon-list">
                        <Button rightIcon={<FaArrowRight />} colorScheme="blue">
                          Go to PokéList
                        </Button>
                      </Link>
                    </Flex>
                  )}
                </Box>
                <Flex
                  justify="center"
                  align="center"
                  order={[1, null, null, 2]}
                >
                  <Image
                    h="120px"
                    w="120px"
                    src="/img/chansey.png"
                    alt="Chansey Favorite Pokémon"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </Flex>
              </SimpleGrid>
            ) : (
              <Flex
                wrap="wrap"
                flexDir="row"
                justify="center"
                align="center"
                gridGap={6}
              >
                {favoritePokemons.map((item, key) => (
                  <Box key={key} position="relative">
                    <Link
                      to={`/pokemon-list/pokemon-page/${item.name}`}
                      onClick={() => {
                        dispatch(getInfoPokemonPage(item.id, item.name))
                      }}
                    >
                      <PokemonImage
                        pokemonName={item.name}
                        pokemonNumber={item.id}
                      />
                    </Link>

                    <IconButton
                      zIndex="3"
                      left="70%"
                      top="0"
                      transitionProperty="all"
                      transition="ease-in-out"
                      transitionDuration="0.5s"
                      fontSize={14}
                      bgColor="secondary"
                      color="primary"
                      position="absolute"
                      borderRadius="50%"
                      icon={<FaTrashAlt />}
                      _hover={{
                        fontSize: 20
                      }}
                      _active={{
                        fontSize: 20
                      }}
                      onClick={() =>
                        setRemovePokemonAlert({
                          isOpen: true,
                          pokemon: item.name,
                          type: 'Pokémon Favorites List'
                        })
                      }
                    />
                  </Box>
                ))}
                {favoritePokemons.length !== 20 &&
                  [...Array(20 - favoritePokemons.length).keys()].map(
                    (_, index) => (
                      <Box
                        key={index}
                        position="relative"
                        opacity="0.25"
                        p="1rem 0"
                        pr={2}
                      >
                        <Box boxSize="110px" position="relative" />
                        <Icon
                          position="absolute"
                          boxSize="10rem"
                          top="39%"
                          left="51%"
                          opacity="0.5"
                          transform="translate(-50%, -50%)"
                          as={CgPokemon}
                        />
                        <Text
                          letterSpacing="0.1em"
                          fontFamily="'Rubick', sans-serif"
                          pt={6}
                        >
                          slot
                        </Text>
                      </Box>
                    )
                  )}
              </Flex>
            )}
          </Box>

          <Box
            w="100%"
            ref={pokeTeamRef}
            pb={[12, null, 20]}
            textAlign="center"
          >
            <Heading as="h3" pb={favoriteTeam.length !== 0 ? 4 : 10}>
              Pokémon Team
            </Heading>
            {favoriteTeam.length !== 0 && (
              <Text fontSize={14} color="grey" fontStyle="italic" pb={10}>
                {isUserLoggedInProfile ? 'You' : 'They'} have{' '}
                <b>{favoriteTeam.length} out of 20</b> possible Pokémons in{' '}
                {isUserLoggedInProfile ? 'your' : 'their'} Pokémon Team
              </Text>
            )}

            {!favoriteTeam.length ? (
              <SimpleGrid
                columns={[1, null, null, 2]}
                justify="center"
                gridGap={6}
              >
                <Flex justify="center" align="center">
                  <Image
                    h="120px"
                    w="120px"
                    alt="Tyrogue Pokémon Team"
                    objectFit="contain"
                    objectPosition="center"
                    src="/img/tyroge.png"
                  />
                </Flex>
                <Box textAlign="left">
                  <Text pb={2}>
                    {isUserLoggedInProfile
                      ? "You don't"
                      : `${username} doesn't`}{' '}
                    have any Pokémon in their Pokémon Team!
                  </Text>
                  {isUserLoggedInProfile ? (
                    <Text pb={6}>
                      It seems like you lack the fighting spirit of a Tyrogue!
                      Let it help you choosing your ideal Pokémon Team!
                    </Text>
                  ) : (
                    <Text pb={6}>
                      It seems like {username} lacks the fighting spirit of a
                      Tyrogue! Hopefully they will get it eventually when
                      they've got a Pokémon Team...
                    </Text>
                  )}
                  {isUserLoggedInProfile && (
                    <Flex justify="center" flexDir="row">
                      <Link to="pokemon-list">
                        <Button rightIcon={<FaArrowRight />} colorScheme="blue">
                          Go to PokéList
                        </Button>
                      </Link>
                    </Flex>
                  )}
                </Box>
              </SimpleGrid>
            ) : (
              <Flex
                wrap="wrap"
                flexDir="row"
                justify="center"
                align="center"
                gridGap={6}
              >
                {favoriteTeam.map((item, key) => (
                  <Box key={key} position="relative">
                    <Link
                      to={`/pokemon-list/pokemon-page/${item.name}`}
                      onClick={() => {
                        dispatch(getInfoPokemonPage(item.id, item.name))
                      }}
                    >
                      <PokemonImage
                        pokemonName={item.name}
                        pokemonNumber={item.id}
                      />
                    </Link>

                    <IconButton
                      zIndex="3"
                      left="70%"
                      top="0"
                      transitionProperty="all"
                      transition="ease-in-out"
                      transitionDuration="0.5s"
                      fontSize={14}
                      bgColor="secondary"
                      color="primary"
                      position="absolute"
                      borderRadius="50%"
                      icon={<FaTrashAlt />}
                      _hover={{
                        fontSize: 20
                      }}
                      _active={{
                        fontSize: 20
                      }}
                      onClick={() =>
                        setRemovePokemonAlert({
                          isOpen: true,
                          pokemon: item.name,
                          type: 'Pokémon Team'
                        })
                      }
                    />
                  </Box>
                ))}
                {favoriteTeam.length !== 6 &&
                  [...Array(6 - favoriteTeam.length).keys()].map((_, index) => (
                    <Box
                      key={index}
                      position="relative"
                      opacity="0.25"
                      p="1rem 0"
                      pr={2}
                    >
                      <Box boxSize="110px" position="relative" />
                      <Icon
                        position="absolute"
                        boxSize="10rem"
                        top="39%"
                        left="51%"
                        opacity="0.5"
                        transform="translate(-50%, -50%)"
                        as={CgPokemon}
                      />
                      <Text
                        letterSpacing="0.1em"
                        fontFamily="'Rubick', sans-serif"
                        pt={6}
                      >
                        slot
                      </Text>
                    </Box>
                  ))}
              </Flex>
            )}
          </Box>

          <Flex
            p={8}
            px={[8, null, 12]}
            mb={20}
            color="#3c3c3b"
            bgColor="#ebebd3"
            borderRadius={4}
            flexDir="column"
            align="center"
          >
            <Heading as="h4" pb={10}>
              PokéTrivia Stats
            </Heading>

            <SimpleGrid
              columns={[1, null, null, 2]}
              justify="center"
              gridGap={6}
            >
              <Box>
                {triviaRecord.realizedTrivias > 0 ? (
                  <>
                    <SimpleGrid columns={[1, null, 2]} pb={8} gridGap={6}>
                      <Flex flexDir="column">
                        <Text fontWeight="bold" pb={2}>
                          PokéTrivias played
                        </Text>
                        <Text>{triviaRecord.realizedTrivias}</Text>
                      </Flex>
                      <Flex flexDir="column">
                        <Text fontWeight="bold" pb={2}>
                          Average of correct answers
                        </Text>
                        <Text>{averageCorrectAnswers}%</Text>
                      </Flex>
                      <Flex flexDir="column">
                        <Text fontWeight="bold" pb={2}>
                          All correct answers
                        </Text>
                        <Text>{triviaRecord.correctAnswers}</Text>
                      </Flex>
                      <Flex flexDir="column">
                        <Text fontWeight="bold" pb={2}>
                          All incorrect answers
                        </Text>
                        <Text>{triviaRecord.wrongAnswers}</Text>
                      </Flex>
                    </SimpleGrid>
                    <Text>
                      With these PokéTrivia numbers we found out that{' '}
                      {isUserLoggedInProfile ? 'you are' : `${username} is`}{' '}
                      intelligent as a{' '}
                      <Link>
                        <Box as="b" color="#f24643" fontSize={18}>
                          {triviaRecord.pokemonIQ}!
                        </Box>
                      </Link>
                    </Text>
                    <Text>{pokemonIQText}</Text>
                  </>
                ) : (
                  <>
                    {isUserLoggedInProfile ? (
                      <>
                        <Text>
                          You still haven't played any PokéTrivia to calculte
                          your Pokémon IQ... Don't be lazy like Slakoth and
                          start playing PokéTrivia to find out the Pokémon that
                          represents your intelligence!
                        </Text>

                        <Link to="/pokemon-trivia">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéTrivia
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Text>
                          {username} still hasn't played any PokéTrivia to
                          calculte their Pokémon IQ... It seems they're a little
                          bit like Slakoth, you know, in the lazy department.
                          Because of that don't know which Pokémon represents
                          the best their intelligence...
                        </Text>
                        <Link to="/pokemon-trivia">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéTrivia
                          </Button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </Box>
              <Flex py={3} justify="center" align="center">
                {triviaRecord.realizedTrivias > 0 ? (
                  <Link
                    to={`/pokemon-list/pokemon-page/${triviaRecord.pokemonIQNumber}`}
                    onClick={() => getInfoPokemonPage(triviaRecord.pokemonIQ)}
                  >
                    <Image
                      maxH="250px"
                      maxW="250px"
                      alt={triviaRecord.pokemonIQ}
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${triviaRecord.pokemonIQNumber}.png`}
                    />
                  </Link>
                ) : (
                  <Link
                    to={`/pokemon-list/pokemon-page/slakoth`}
                    onClick={() => getInfoPokemonPage('slakoth')}
                  >
                    <Image
                      maxH="250px"
                      maxW="250px"
                      alt="Slakoth"
                      src="/img/slakoth.png"
                    />
                  </Link>
                )}
              </Flex>
            </SimpleGrid>
          </Flex>

          <Box pb={14}>
            <Heading pb={12} textAlign="center" as="h3">
              Personalities
            </Heading>

            <SimpleGrid columns={[1, null, 2]} gridGap={[10, null, 14]}>
              <Box>
                <Heading pb={6} textAlign="center" as="h4">
                  PokéCarer Personality
                </Heading>
                {favoritePokemons.length !== 0 ? (
                  <>
                    <Text
                      pb={4}
                      textAlign="center"
                      fontSize={20}
                      fontWeight="bold"
                      color="white"
                    >
                      You're a{' '}
                      <Text as="span" color="secondary">
                        {messageFavorites[0]}
                      </Text>
                    </Text>
                    <Text textAlign="left">{messageFavorites[1]}</Text>
                    {isUserLoggedInProfile && (
                      <Text
                        pt={4}
                        fontSize={14}
                        fontStyle="italic"
                        color="grey"
                      >
                        This result varies depending which Pokémons you have in
                        your Favorite Pokémon List
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    <Image
                      mx="auto"
                      boxSize="120px"
                      alt="Ditto"
                      src="/img/ditto.png"
                      pb={4}
                    />
                    <Text>
                      {isUserLoggedInProfile
                        ? "You don't"
                        : `${username} doesn't`}{' '}
                      have any pokémons on{' '}
                      {isUserLoggedInProfile ? 'your' : 'their'}{' '}
                      <Box
                        as="b"
                        onClick={() => scrollToRef(pokeFavoriteListRef)}
                      >
                        Favorite Pokemons List
                      </Box>{' '}
                      to calculate the necessary operation to find out this
                      personality...
                    </Text>
                    {isUserLoggedInProfile && (
                      <Text pt={4}>
                        If you're curious just starting adding Pokémon to your
                        Favorites List and come back here once you're done!
                      </Text>
                    )}
                    {isUserLoggedInProfile && (
                      <Flex justify="center" align="center" pt={8}>
                        <Link to="/pokemon-list">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéList
                          </Button>
                        </Link>
                      </Flex>
                    )}
                  </>
                )}
              </Box>
              <Box>
                <Heading pb={6} textAlign="center" as="h4">
                  PokéTrainer Personality
                </Heading>
                {favoriteTeam.length !== 0 ? (
                  <>
                    <Text
                      pb={4}
                      textAlign="center"
                      fontSize={20}
                      fontWeight="bold"
                      color="white"
                    >
                      You're a{' '}
                      <Text as="span" color="secondary">
                        {messageTeam[0]}
                      </Text>
                    </Text>
                    <Text textAlign="left">{messageTeam[1]}</Text>
                    {isUserLoggedInProfile && (
                      <Text
                        pt={4}
                        fontSize={14}
                        fontStyle="italic"
                        color="grey"
                      >
                        This result varies depending which Pokémons you have in
                        your Favorite Pokémon List
                      </Text>
                    )}
                  </>
                ) : (
                  <>
                    <Image
                      mx="auto"
                      boxSize="120px"
                      alt="Magikarp"
                      src="/img/magikarp.png"
                      pb={4}
                    />
                    <Text>
                      {isUserLoggedInProfile
                        ? "You don't"
                        : `${username} doesn't`}{' '}
                      have any pokémons on{' '}
                      {isUserLoggedInProfile ? 'your' : 'their'}{' '}
                      <Box as="b" onClick={() => scrollToRef(pokeTeamRef)}>
                        Pokémon Team
                      </Box>{' '}
                      to calculate the necessary operation to find out this
                      personality...
                    </Text>
                    {isUserLoggedInProfile && (
                      <Text pt={4}>
                        If you're curious just starting adding Pokémon to your
                        Team and come back here once you're done!
                      </Text>
                    )}
                    {isUserLoggedInProfile && (
                      <Flex justify="center" align="center" pt={8}>
                        <Link to="/pokemon-list">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéList
                          </Button>
                        </Link>
                      </Flex>
                    )}
                  </>
                )}
              </Box>
            </SimpleGrid>
          </Box>

          <AlertDialog
            isOpen={removePokemonAlert.isOpen}
            onClose={() =>
              setRemovePokemonAlert({
                ...removePokemonAlert,
                isOpen: false,
                type: null
              })
            }
          >
            <AlertDialogOverlay>
              <AlertDialogContent color="#3c3c3b" bgColor="#ebebd3" p={4}>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Remove {removePokemonAlert.pokemon}
                </AlertDialogHeader>

                <AlertDialogBody>
                  Are you sure you want to remove {removePokemonAlert.pokemon}{' '}
                  from your {removePokemonAlert.type}? You can't undo this
                  action afterwards.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button
                    mr={3}
                    colorScheme="blue"
                    onClick={() =>
                      setRemovePokemonAlert({
                        ...removePokemonAlert,
                        isOpen: false,
                        type: null
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      console.log(removePokemonAlert)
                      if (removePokemonAlert.type === 'Pokémon Team') {
                        dispatch(
                          removePokemonFromTeam(removePokemonAlert.pokemon)
                        )
                      } else {
                        dispatch(
                          removeFavoritePokemon(removePokemonAlert.pokemon)
                        )
                      }

                      setRemovePokemonAlert({
                        ...removePokemonAlert,
                        isOpen: false,
                        type: null
                      })
                    }}
                  >
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>

          <Modal
            size="xl"
            isCentered
            isOpen={avatarModal}
            onClose={() => setAvatarModal(false)}
            blockScrollOnMount={false}
            scrollBehavior="inside"
          >
            <ModalOverlay />
            <ModalContent p={6} bgColor="#ebebd3">
              <ModalHeader fontSize={28} as="h4">
                Edit Avatar
              </ModalHeader>
              <ModalBody color="#3c3c3b">
                <Flex wrap="wrap" gridGap={6}>
                  {avatarsList.map((item, index) => (
                    <Avatar
                      key={index}
                      boxSize={24}
                      alt={avatar}
                      boxShadow="md"
                      transitionProperty="all"
                      transition="ease-in-out"
                      transitionDuration="0.5s"
                      bg={item === chosenAvatar ? '#ffe066' : '#1688b9'}
                      onClick={() => setChosenAvatar(item)}
                      src={`/img/avatars/avatar-${item}.png`}
                    />
                  ))}
                </Flex>
              </ModalBody>

              <ModalFooter>
                <Button
                  mr={3}
                  colorScheme="blue"
                  onClick={() => setAvatarModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  colorScheme="green"
                  isDisabled={chosenAvatar === avatar}
                  onClick={() => {
                    setAvatarModal(false)
                    dispatch(editProfileField('avatar', chosenAvatar))
                  }}
                >
                  Edit Avatar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  )
}

export default Profile
