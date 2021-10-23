import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInfoPokemonPage } from 'redux/actions/pokemonActions';
import {
  getUser,
  editProfileField,
  removeFavoritePokemon,
  removePokemonFromTeam,
  updatePokeTeamList,
  updateFavoritePokeList
} from 'redux/actions/userActions';
import { signOut } from 'redux/actions/authActions';

import { Link, useRouteMatch } from 'react-router-dom';
import moment from 'moment';

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
  IconButton,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogFooter,
  Icon,
  Grid,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import {
  FaArrowRight,
  FaEdit,
  FaMinus,
  FaPlus,
  FaSignOutAlt,
  FaTrashAlt
} from 'react-icons/fa';
import { CgPokemon } from 'react-icons/cg';

import SEO from 'components/Seo';
import avatarsList from 'assets/content/avatarsList';
import getStatsMessages from 'utils/getMessageFavoritesTeam';
import scrollToRef from 'utils/scrollToRef';
import Button from 'components/layout/Button';
import PokemonImage from 'components/layout/PokemonImage';
import PokeballMinigameStat from 'components/layout/PokeballMinigameStat';
import Loading from 'components/feedback/Loading';
import DragGridList from 'components/pages/Profile/DragGridList';
import EditableSelect from 'components/pages/Profile/EditableSelect';

const Profile = props => {
  useEffect(() => {
    if (match.params.username !== userInfo.username) {
      dispatch(() => getUser(match.params.username));
    }

    if (isUserLoggedInProfile) {
      const urls = [
        `https://pokeapi.co/api/v2/version-group/`,
        `https://pokeapi.co/api/v2/region/`
      ];

      const getRegionsAndGames = async () => {
        const returnRegionsAndGames = await Promise.all(
          urls.map(async url => {
            try {
              const getRequest = await fetch(url);
              const getDataRequest = await getRequest.json();
              return getDataRequest.results;
            } catch (err) {
              return err.response.message;
            }
          })
        );
        setEditContent({
          games: returnRegionsAndGames[0],
          regions: returnRegionsAndGames[1]
        });
        setLoading(false);
      };

      getRegionsAndGames();
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dispatch = useDispatch();
  const match = useRouteMatch();
  const profile = useSelector(state => state.firebase.profile);
  const getUserInfo = useSelector(state => state.user.queryUser);
  const isUserLoggedInProfile = getUserInfo.username === profile.username;
  const userInfo = isUserLoggedInProfile ? profile : getUserInfo;

  const {
    username,
    createdAt,
    avatar,
    favoriteGame,
    favoriteRegion,
    favoritePokemons,
    favoriteTeam,
    minigames,
    triviaRecord
  } = userInfo;

  let findOccupiedPokeSlotsInPokeFavorites;

  console.log('fav pok =>', favoritePokemons, favoritePokemons.length);
  console.log('fav team =>', favoriteTeam, favoriteTeam.length);

  if (favoritePokemons?.length !== 0) {
    for (let index = 0; index < 20; index++) {
      if (!favoritePokemons[index]) {
        favoritePokemons.push({ isEmpty: true });
      }
    }
  }

  if (favoriteTeam?.length !== 0) {
    for (let index = 0; index < 6; index++) {
      if (!favoriteTeam[index]) {
        favoriteTeam.push({ isEmpty: true });
      }
    }
  }

  const messageFavorites = getStatsMessages(favoritePokemons, 'favorites');
  const messageTeam = getStatsMessages(favoriteTeam, 'team');

  const [editContent, setEditContent] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [avatarModal, setAvatarModal] = useState(false);
  const [chosenAvatar, setChosenAvatar] = useState(avatar);
  const [removePokemonAlert, setRemovePokemonAlert] = useState({
    isOpen: false,
    pokemon: null,
    type: null
  });

  const [showAllFavorites, setShowAllFavorites] = useState({
    isOpen: false,
    pokemons:
      favoritePokemons?.length === 0 ? null : favoritePokemons.slice(0, 12)
  });

  const [pokeFavoriteList, setPokeFavoriteList] = useState(favoritePokemons);
  const [pokeTeamList, setPokeTeamList] = useState(favoriteTeam);

  const [originalPokeFavoriteList, setOriginalPokeFavoriteList] =
    useState(favoritePokemons);
  const [originalPokeTeamList, setOriginalPokeTeamList] =
    useState(favoriteTeam);

  const [editOrder, setEditOrder] = useState({
    isEditingOrderFavPoke: false,
    isEditingOrderFavTeam: false
  });

  const pokeFavoriteListRef = useRef(null);
  const pokeTeamRef = useRef(null);
  const pokeCarerPerRef = useRef(null);
  const pokeTrainerPerRef = useRef(null);

  let averageCorrectAnswers, pokemonIQText;

  if (minigames.pokemonIQ) {
    averageCorrectAnswers =
      minigames.pokeTrivia.correctAnswers /
      (minigames.pokeTrivia.correctAnswers + minigames.pokeTrivia.wrongAnswers);
    averageCorrectAnswers *= 100;
    averageCorrectAnswers = parseInt(averageCorrectAnswers);

    switch (minigames.pokemonIQ) {
      case 'Magikarp':
        pokemonIQText = `Humm, it seems like ${
          isUserLoggedInProfile ? 'you are' : `${username} is`
        } doing very badly in PokéTrivia, like a Magikarp... Maybe ${
          isUserLoggedInProfile ? 'you' : username
        } just ${
          isUserLoggedInProfile ? 'need' : 'needs'
        } to check the trivia answers on the web or study a little bit to not have the IQ of a Magikarp`;
        break;
      case 'Slowpoke':
        pokemonIQText = `It seems ${
          isUserLoggedInProfile ? 'you are' : `${username} is`
        }  quite rusty in PokéTrivia Departement, which means ${
          isUserLoggedInProfile ? 'your' : 'their'
        } IQ is the same as a Slowpoke... Gotta remember all those facts or maybe just search the answer on the web to improve this IQ`;
        break;
      case 'Quagsire':
        pokemonIQText = `Like, ${
          isUserLoggedInProfile ? 'you are' : `${username} is`
        } somewhat oblivious but still your brain at certain times can help you solving PokéTrivias... The thing is this IQ is inconsistent, as a Quagsire! Maybe with a little more attention and work and this IQ might level up!`;
        break;
      case 'Beheeyem':
        pokemonIQText = `${
          isUserLoggedInProfile ? 'Your' : username
        } IQ is a little bit out of this world like Beheeyem intelligence is not from ours! Such alien intelligence, much wow!`;
        break;
      case 'Metagross':
        pokemonIQText = `${
          isUserLoggedInProfile ? 'Your' : username
        } IQ in Pokémon Trivia is almost unbelievable matching Metagross's 4 brains said to be superior to a supercomputer! Need to keep up those 4 brains power in Pokémon Trivia!`;
        break;
      case 'Alakazam':
        pokemonIQText = `${
          isUserLoggedInProfile ? 'Your' : username
        } IQ in Pokémon Trivia is so unbelievable it stands toe to toe with Alakazam, the most intelligent Pokémon in the Pokémon Universe, just wow!`;
        break;
      default:
        break;
    }
  }

  return (
    <>
      <SEO
        title={username}
        description={'Explore the profiles of specific users from Pokéfav'}
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
                to="/"
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
                transitionDuration="0.3s"
                bgColor="secondary"
                position="absolute"
                color="primary"
                isRound={true}
                icon={<FaEdit />}
                zIndex="3"
                top="6rem"
                fontSize={14}
                opacity="0.9"
                _hover={{
                  opacity: 1,
                  fontSize: 18
                }}
                _active={{
                  opacity: 1,
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
              src={`/img/avatars/avatar-${avatar}.png`}
            />
            <Heading pb={[6, null, 0]} as="h1">
              {username}
            </Heading>
          </Flex>

          <Flex
            flexDir="row"
            flexWrap="wrap"
            pb={16}
            gridGap={[8, null, 6]}
            textAlign="center"
            justify="space-around"
          >
            <Box gridColumnEnd={2}>
              <Heading as="h5" fontSize={20}>
                Signed up at
              </Heading>
              <Text>{moment(createdAt.seconds).format('Do MMMM YYYY')}</Text>
            </Box>
            <Box>
              <Heading as="h5" fontSize={20}>
                Personalities
              </Heading>
              <Box>
                {messageFavorites[0].includes(
                  "You still haven't added any Pokémon"
                ) ? (
                  <Text pb={1}>Unknown</Text>
                ) : (
                  <Text
                    color="blue.400"
                    fontWeight="600"
                    pb={1}
                    transition="all ease-in-out 0.3s"
                    onClick={() => scrollToRef(pokeCarerPerRef)}
                    _hover={{
                      color: 'blue.300',
                      cursor: 'pointer'
                    }}
                    _active={{
                      color: 'blue.300',
                      cursor: 'pointer'
                    }}
                  >
                    {messageFavorites[0]}
                  </Text>
                )}
                {messageTeam[0].includes(
                  "You still haven't added any Pokémon"
                ) ? (
                  <Text>Unknown</Text>
                ) : (
                  <Text
                    color="blue.400"
                    fontWeight="600"
                    transition="all ease-in-out 0.3s"
                    onClick={() => scrollToRef(pokeTrainerPerRef)}
                    _hover={{
                      color: 'blue.300',
                      cursor: 'pointer'
                    }}
                    _active={{
                      color: 'blue.300',
                      cursor: 'pointer'
                    }}
                  >
                    {messageTeam[0]}
                  </Text>
                )}
              </Box>
            </Box>
            <Box>
              <Heading as="h5" fontSize={20}>
                Pokémon IQ
              </Heading>

              <Text
                color="blue.400"
                fontWeight="600"
                pb={1}
                transition="all ease-in-out 0.3s"
                onClick={() => scrollToRef(pokeCarerPerRef)}
                _hover={{
                  color: 'blue.300',
                  cursor: 'pointer'
                }}
                _active={{
                  color: 'blue.300',
                  cursor: 'pointer'
                }}
              >
                {favoriteGame}
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
          </Flex>

          <Box ref={pokeFavoriteListRef} w="100%" pb={[20]} textAlign="center">
            <Heading as="h3" pb={favoritePokemons.length !== 0 ? 4 : 10}>
              Favorite Pokémons
            </Heading>

            {favoritePokemons.length !== 0 && (
              <Text fontSize={14} color="grey" fontStyle="italic" pb={10}>
                {isUserLoggedInProfile ? 'You' : 'They'} have{' '}
                <b>{pokeFavoriteList.filter(i => i.name).length} out of 20</b>{' '}
                possible Pokémons in {isUserLoggedInProfile ? 'your' : 'their'}{' '}
                Favorite Pokémon List
              </Text>
            )}

            {!favoritePokemons.length ? (
              <Flex
                gridGap={[4, null, null, 10]}
                wrap="wrap"
                flexDir="row"
                justify="center"
                align="center"
              >
                <Box
                  textAlign="left"
                  order={[2, null, null, 1]}
                  w={['85%', null, null, '50%']}
                >
                  <Text pb={2}>
                    {isUserLoggedInProfile
                      ? "You don't"
                      : `${username} doesn't`}{' '}
                    have any Pokémon in their Favorite Pokémons List!
                  </Text>
                  {isUserLoggedInProfile ? (
                    <>
                      <Text pb={6}>
                        It seems like you lack the caring and sharing spirit of
                        a Chansey! Let it help you filling your Favorite Pokémon
                        List!
                      </Text>
                      <Flex justify="center" flexDir="row">
                        <Link to="pokemon-list">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéList
                          </Button>
                        </Link>
                      </Flex>
                    </>
                  ) : (
                    <Text>
                      It seems like {username} lacks the caring and sharing
                      spirit of a Chansey!! Hopefully they will get it
                      eventually when they've some Pokémons in their Favorite
                      Pokémon List...
                    </Text>
                  )}
                </Box>
                <Flex
                  order={[1, null, null, 2]}
                  justify="center"
                  align="center"
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
              </Flex>
            ) : (
              <>
                {isUserLoggedInProfile && editOrder.isEditingOrderFavPoke ? (
                  <DragGridList
                    data={pokeFavoriteList}
                    list="Pokémon Favorites List"
                    updateListFunc={list => setPokeFavoriteList(list)}
                    funcPokemonAlert={item =>
                      setRemovePokemonAlert({
                        isOpen: true,
                        pokemon: item.name,
                        type: 'Pokémon Favorites List'
                      })
                    }
                  />
                ) : (
                  <Grid
                    gridGap={[4, 2]}
                    templateColumns={[
                      'repeat(auto-fit, minmax(145px, 1fr))',
                      null,
                      'repeat(3, 1fr)',
                      'repeat(6, 1fr)'
                    ]}
                  >
                    {showAllFavorites.pokemons.map((item, index) =>
                      item?.isEmpty ? (
                        <Flex
                          key={index}
                          flexDir="column"
                          align="center"
                          position="relative"
                          opacity="0.25"
                          p="1rem 0"
                        >
                          <Box boxSize="110px" position="relative" />
                          <Icon
                            position="absolute"
                            boxSize="10rem"
                            top="39%"
                            left="50%"
                            opacity="0.5"
                            transform="translate(-50%, -50%)"
                            as={CgPokemon}
                          />
                          <Text
                            letterSpacing="0.1em"
                            fontFamily="'Rubick', sans-serif"
                            pt={6}
                          >
                            ---
                          </Text>
                        </Flex>
                      ) : (
                        <Flex justify="center" key={index} position="relative">
                          <Box
                            as={Link}
                            position="relative"
                            to={`/pokemon-list/pokemon-page/${item.name}`}
                            onClick={() => {
                              dispatch(getInfoPokemonPage(item.id, item.name));
                            }}
                          >
                            <PokemonImage
                              pokemonName={item.name}
                              pokemonNumber={item.id}
                            />
                          </Box>
                          {isUserLoggedInProfile && (
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
                          )}
                        </Flex>
                      )
                    )}
                  </Grid>
                )}

                <Wrap
                  pt={6}
                  spacing={4}
                  align="center"
                  justify="center"
                  w="100%"
                >
                  {(!isUserLoggedInProfile ||
                    (editOrder.isEditingOrderFavTeam &&
                      !editOrder.isEditingOrderFavPoke) ||
                    (!editOrder.isEditingOrderFavTeam &&
                      !editOrder.isEditingOrderFavPoke)) && (
                    <WrapItem>
                      <Button
                        colorScheme={!showAllFavorites.isOpen ? 'green' : 'red'}
                        leftIcon={
                          !showAllFavorites.isOpen ? <FaPlus /> : <FaMinus />
                        }
                        onClick={() =>
                          setShowAllFavorites({
                            isOpen: !showAllFavorites.isOpen,
                            pokemons:
                              pokeFavoriteList.filter(i => i.name).length <=
                                12 && !showAllFavorites.isOpen
                                ? favoritePokemons
                                : favoritePokemons.slice(0, 12)
                          })
                        }
                      >
                        {!showAllFavorites.isOpen
                          ? 'Show all slots'
                          : 'Show less'}
                      </Button>
                    </WrapItem>
                  )}

                  {isUserLoggedInProfile && (
                    <>
                      {!editOrder.isEditingOrderFavPoke ? (
                        <WrapItem>
                          <Button
                            colorScheme="green"
                            leftIcon={<FaEdit />}
                            isDisabled={editOrder.isEditingOrderFavTeam}
                            onClick={() =>
                              setEditOrder({
                                isEditingOrderFavPoke: true,
                                isEditingOrderFavTeam: false
                              })
                            }
                          >
                            Edit Pokémon order in Favorite Pokémon list
                          </Button>
                        </WrapItem>
                      ) : (
                        <>
                          <WrapItem>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                setEditOrder({
                                  isEditingOrderFavPoke: false
                                });
                                setPokeFavoriteList(originalPokeFavoriteList);
                              }}
                            >
                              Cancel
                            </Button>
                          </WrapItem>
                          <WrapItem>
                            <Button
                              colorScheme="green"
                              leftIcon={<FaEdit />}
                              onClick={() => {
                                setEditOrder({
                                  isEditingOrderFavPoke: false
                                });
                                setOriginalPokeFavoriteList(pokeFavoriteList);
                                console.log(pokeFavoriteList);
                                dispatch(
                                  updateFavoritePokeList(pokeFavoriteList)
                                );
                              }}
                            >
                              Update Pokémon order in Favorite Pokémon
                            </Button>
                          </WrapItem>
                        </>
                      )}
                    </>
                  )}
                </Wrap>
              </>
            )}
          </Box>

          <Box w="100%" ref={pokeTeamRef} pb={[20]} textAlign="center">
            <Heading as="h3" pb={favoriteTeam.length !== 0 ? 4 : 10}>
              Pokémon Team
            </Heading>
            {favoriteTeam.length !== 0 && (
              <Text fontSize={14} color="grey" fontStyle="italic" pb={10}>
                {isUserLoggedInProfile ? 'You' : 'They'} have{' '}
                <b>{pokeTeamList.filter(i => i.name).length} out of 6</b>{' '}
                possible Pokémons in {isUserLoggedInProfile ? 'your' : 'their'}{' '}
                Pokémon Team
              </Text>
            )}

            {!favoriteTeam.length ? (
              <Flex
                gridGap={[4, null, null, 10]}
                wrap="wrap"
                flexDir="row"
                justify="center"
                align="center"
              >
                <Box
                  textAlign="left"
                  order={[2, null, null, 1]}
                  w={['85%', null, null, '50%']}
                >
                  <Text pb={2}>
                    {isUserLoggedInProfile
                      ? "You don't"
                      : `${username} doesn't`}{' '}
                    have any Pokémon in their Pokémon Team!
                  </Text>
                  {isUserLoggedInProfile ? (
                    <>
                      <Text pb={6}>
                        It seems like you lack the fighting spirit of a Tyrogue!
                        Let it help you choosing your ideal Pokémon Team!
                      </Text>
                      <Flex justify="center" flexDir="row">
                        <Link to="pokemon-list">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéList
                          </Button>
                        </Link>
                      </Flex>
                    </>
                  ) : (
                    <Text>
                      It seems like {username} lacks the fighting spirit of a
                      Tyrogue! Hopefully they will get it eventually when
                      they've got a Pokémon Team...
                    </Text>
                  )}
                </Box>
                <Flex
                  order={[1, null, null, 2]}
                  justify="center"
                  align="center"
                >
                  <Image
                    h="200px"
                    w="200px"
                    alt="Tyrogue Pokémon Team"
                    objectFit="contain"
                    objectPosition="center"
                    src="/img/tyroge.png"
                  />
                </Flex>
              </Flex>
            ) : (
              <>
                {isUserLoggedInProfile && editOrder.isEditingOrderFavTeam ? (
                  <DragGridList
                    data={pokeTeamList}
                    list="Pokémon Team"
                    updateListFunc={list => setPokeTeamList(list)}
                    funcPokemonAlert={item =>
                      setRemovePokemonAlert({
                        isOpen: true,
                        pokemon: item.name,
                        type: 'Pokémon Team'
                      })
                    }
                  />
                ) : (
                  <Grid
                    gridGap={[4, 2]}
                    templateColumns={[
                      'repeat(auto-fit, minmax(145px, 1fr))',
                      null,
                      'repeat(3, 1fr)',
                      'repeat(6, 1fr)'
                    ]}
                  >
                    {favoriteTeam.map((item, index) =>
                      item?.isEmpty ? (
                        <Flex
                          key={index}
                          flexDir="column"
                          align="center"
                          position="relative"
                          opacity="0.25"
                          p="1rem 0"
                        >
                          <Box boxSize="110px" position="relative" />
                          <Icon
                            position="absolute"
                            boxSize="10rem"
                            top="39%"
                            left="50%"
                            opacity="0.5"
                            transform="translate(-50%, -50%)"
                            as={CgPokemon}
                          />
                          <Text
                            letterSpacing="0.1em"
                            fontFamily="'Rubick', sans-serif"
                            pt={6}
                          >
                            ---
                          </Text>
                        </Flex>
                      ) : (
                        <Flex key={index} justify="center" position="relative">
                          <Box
                            as={Link}
                            position="relative"
                            to={`/pokemon-list/pokemon-page/${item.name}`}
                            onClick={() => {
                              dispatch(getInfoPokemonPage(item.id, item.name));
                            }}
                          >
                            <PokemonImage
                              pokemonName={item.name}
                              pokemonNumber={item.id}
                            />
                          </Box>
                          {isUserLoggedInProfile && (
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
                          )}
                        </Flex>
                      )
                    )}
                  </Grid>
                )}

                <Wrap
                  pt={6}
                  spacing={4}
                  align="center"
                  justify="center"
                  w="100%"
                >
                  {isUserLoggedInProfile && (
                    <>
                      {!editOrder.isEditingOrderFavTeam ? (
                        <WrapItem>
                          <Button
                            colorScheme="green"
                            leftIcon={<FaEdit />}
                            isDisabled={editOrder.isEditingOrderFavPoke}
                            onClick={() =>
                              setEditOrder({
                                isEditingOrderFavPoke: false,
                                isEditingOrderFavTeam: true
                              })
                            }
                          >
                            Edit Pokémon order in Pokémon Team
                          </Button>
                        </WrapItem>
                      ) : (
                        <>
                          <WrapItem>
                            <Button
                              colorScheme="red"
                              onClick={() => {
                                setEditOrder({
                                  isEditingOrderFavTeam: false
                                });
                                setPokeTeamList(originalPokeTeamList);
                              }}
                            >
                              Cancel
                            </Button>
                          </WrapItem>
                          <WrapItem>
                            <Button
                              colorScheme="green"
                              leftIcon={<FaEdit />}
                              onClick={() => {
                                setEditOrder({
                                  isEditingOrderFavTeam: false
                                });
                                setOriginalPokeTeamList(pokeTeamList);
                                dispatch(updatePokeTeamList(pokeTeamList));
                              }}
                            >
                              Update Pokémon order in Pokémon Team
                            </Button>
                          </WrapItem>
                        </>
                      )}
                    </>
                  )}
                </Wrap>
              </>
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
              PokéMinigames Stats
            </Heading>

            {minigames.played <= 3 ? (
              <Flex
                gridGap={[4, null, null, 10]}
                wrap="wrap"
                flexDir="row"
                justify="center"
                align="center"
              >
                <Box order={[2, null, null, 1]} w={['85%', null, null, '50%']}>
                  {isUserLoggedInProfile ? (
                    <>
                      <Text pb={6}>
                        You still haven't played at least 5 PokéMinigames to
                        calculte your Pokémon IQ... Don't be lazy like Slakoth
                        and start playing some PokéMinigames to find out the
                        Pokémon that represents your intelligence!
                      </Text>
                      <Flex justify="center">
                        <Link to="/minigames">
                          <Button
                            rightIcon={<FaArrowRight />}
                            colorScheme="blue"
                          >
                            Go to PokéMinigames
                          </Button>
                        </Link>
                      </Flex>
                    </>
                  ) : (
                    <Text>
                      {username} still hasn't played at least 5 PokéMinigames to
                      calculte their Pokémon IQ... It seems they're a little bit
                      like Slakoth, you know, in the lazy department. Because of
                      that they don't know which Pokémon represents the best
                      their intelligence...
                    </Text>
                  )}
                </Box>
                <Flex
                  order={[1, null, null, 2]}
                  justify="center"
                  align="center"
                >
                  <Link
                    to={`/pokemon-list/pokemon-page/slakoth`}
                    onClick={() => getInfoPokemonPage('slakoth')}
                  >
                    <Image
                      maxH="200px"
                      maxW="200px"
                      alt="Slakoth"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/287.png`}
                    />
                  </Link>
                </Flex>
              </Flex>
            ) : (
              <>
                <Flex
                  pb={8}
                  wrap="wrap"
                  flexDir="row"
                  justify="center"
                  align="center"
                  gridGap={8}
                >
                  <Box w={['85%', null, null, '50%']}>
                    <Text pb={6}>
                      With {isUserLoggedInProfile ? 'your' : 'their'} shown
                      performance in our minigames we found out that{' '}
                      {isUserLoggedInProfile ? 'you are' : `${username} is`}{' '}
                      intelligent as a{' '}
                      <Link
                        to={`/pokemon-list/pokemon-page/${minigames.pokemonIQNr}`}
                        className="basicLink"
                      >
                        <Box as="b" fontSize={18}>
                          {triviaRecord.pokemonIQ}!
                        </Box>
                      </Link>
                    </Text>
                    <Text fontSize={20} color="tertiary" fontWeight="bold">
                      {pokemonIQText}
                    </Text>
                  </Box>
                  <Flex justify="center" align="center">
                    <Link
                      to={`/pokemon-list/pokemon-page/${minigames.pokemonIQNr}`}
                      onClick={() => getInfoPokemonPage(minigames.pokemonIQ)}
                    >
                      <Image
                        maxH="250px"
                        maxW="250px"
                        alt={minigames.pokemonIQ}
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${minigames.pokemonIQNr}.png`}
                      />
                    </Link>
                  </Flex>
                </Flex>

                <Heading as="h2" pb={6}>
                  PokéTrivia
                </Heading>
                <Flex
                  w="100%"
                  wrap="wrap"
                  flexDir="row"
                  pb={[14, null, null, 10]}
                  justify="center"
                  gridGap={6}
                >
                  <PokeballMinigameStat
                    statData={minigames.pokeTrivia.played}
                    statTitle="PokéTrivias played"
                  />
                  <PokeballMinigameStat
                    statData={`${averageCorrectAnswers}%`}
                    statTitle="Average of correct answers"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeTrivia.correctAnswers}
                    statTitle="All correct answers"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeTrivia.wrongAnswers}
                    statTitle="All incorrect answers"
                  />
                </Flex>
                <Heading pb={6}>PokéTypes</Heading>
                <Flex
                  w="100%"
                  wrap="wrap"
                  flexDir="row"
                  pb={[14, null, null, 10]}
                  justify="center"
                  gridGap={6}
                >
                  <PokeballMinigameStat
                    statData={minigames.pokeTypes.played}
                    statTitle="PokéTypes played"
                  />
                  <PokeballMinigameStat
                    statData={0}
                    statTitle="Average time per session"
                  />
                  <PokeballMinigameStat
                    statData={`${averageCorrectAnswers}%`}
                    statTitle="Average of correct types chosen"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeTypes.correctTypesChosen}
                    statTitle="All correct types chosen"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeTypes.incorrectTypesChosen}
                    statTitle="All incorrect types chosen"
                  />
                </Flex>
                <Heading pb={6}>PokéGuess</Heading>
                <Flex
                  w="100%"
                  wrap="wrap"
                  flexDir="row"
                  pb={[14, null, null, 10]}
                  justify="center"
                  gridGap={6}
                >
                  <PokeballMinigameStat
                    statData={minigames.pokeGuess.played}
                    statTitle="PokéGuesses played"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeGuess.streak}
                    statTitle="Average of correct guesses"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeGuess.streak}
                    statTitle="Best correct answers streak"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeGuess.correctGuesses}
                    statTitle="All correct guesses"
                  />
                  <PokeballMinigameStat
                    statData={minigames.pokeGuess.incorrectGuesses}
                    statTitle="All incorrect guesses"
                  />
                </Flex>
              </>
            )}
          </Flex>

          <Box pb={14}>
            <Heading pb={12} textAlign="center" as="h3">
              Personalities
            </Heading>

            <SimpleGrid columns={[1, null, 2]} gridGap={[10, null, 14]}>
              <Box ref={pokeCarerPerRef}>
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
                      {isUserLoggedInProfile
                        ? "You're"
                        : `You - ${username} - are`}{' '}
                      a{' '}
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
                        This result varies depending which Pokémons{' '}
                        {isUserLoggedInProfile ? 'you' : 'they'} have in{' '}
                        {isUserLoggedInProfile ? 'your' : 'their'} Favorite
                        Pokémon List
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
              <Box ref={pokeTrainerPerRef}>
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
                      {isUserLoggedInProfile
                        ? "You're"
                        : `You - ${username} - are`}{' '}
                      a{' '}
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
                        This result varies depending which Pokémons{' '}
                        {isUserLoggedInProfile ? 'you' : 'they'} have in{' '}
                        {isUserLoggedInProfile ? 'your' : 'their'} Favorite
                        Pokémon List
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
                <AlertDialogHeader as="h2" fontSize="lg" fontWeight="bold">
                  Remove {removePokemonAlert.pokemon}
                </AlertDialogHeader>

                <AlertDialogBody>
                  <Text pb={2}>
                    Are you sure you want to remove{' '}
                    <b>{removePokemonAlert.pokemon}</b> from your{' '}
                    <b>{removePokemonAlert.type}</b>?
                  </Text>
                  <Text color="red.500">
                    You can't undo this action afterwards.
                  </Text>
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
                      console.log(removePokemonAlert);
                      if (removePokemonAlert.type === 'Pokémon Team') {
                        dispatch(
                          removePokemonFromTeam(removePokemonAlert.pokemon)
                        );
                      } else {
                        dispatch(
                          removeFavoritePokemon(removePokemonAlert.pokemon)
                        );
                      }

                      setRemovePokemonAlert({
                        ...removePokemonAlert,
                        isOpen: false,
                        type: null
                      });
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
                    setAvatarModal(false);
                    dispatch(editProfileField('avatar', chosenAvatar));
                  }}
                >
                  Update Avatar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Profile;
