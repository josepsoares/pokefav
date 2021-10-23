import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getInfoPokemonPage } from 'redux/actions/pokemonActions';
import { getUser } from 'redux/actions/userActions';

import { Link } from 'react-router-dom';
import moment from 'moment';
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  Avatar,
  Icon
} from '@chakra-ui/react';
import { FaPlus, FaRegClock, FaRegHandPointDown } from 'react-icons/fa';

import Loading from 'components/feedback/Loading';
import ReactionIcons from 'components/layout/ReactionIcons';
import getStatsMessages from 'utils/getMessageFavoritesTeam';

class UserHome extends Component {
  render() {
    const { profileContent, notifications, getUser, reactionIsLoading, auth } =
      this.props;
    const { username, favoritePokemons, favoriteTeam, minigames } =
      profileContent;

    console.log(profileContent, auth);

    const getFavoritesMessage = getStatsMessages(favoritePokemons, 'favorites');
    const getTeamMessage = getStatsMessages(favoriteTeam, 'team');

    const mainItems = [
      {
        title: 'Explore the PokéList',
        link: '/pokemon-list',
        img: 'img/pokelist-smaller.jpg'
      },
      {
        title: 'Play PokéMinigames',
        link: '/minigames',
        img: 'img/poketrivia.jpg'
      },
      {
        title: 'Checkout the Community',
        link: '/pokemon-trainers',
        img: 'img/pokecommunity.png'
      }
    ];

    if (!notifications) {
      return <Loading />;
    } else {
      return (
        <>
          <Heading as="h1" fontSize="5xl" pb={4}>
            Welcome {username}!
          </Heading>
          <Heading as="h2" pb={6}>
            Let's get started with your PokéFav experience by exploring one of
            the three the fun functionalities we've made for you bellow!{' '}
            <FaRegHandPointDown style={{ display: 'inline' }} />
          </Heading>

          <SimpleGrid pt={10} pb={20} columns={[1, null, null, 3]} gridGap={8}>
            {mainItems.map((item, index) => (
              <Link key={index} to={item.link}>
                <Flex
                  p={8}
                  justify="center"
                  align="center"
                  flexDir="column"
                  textAlign="center"
                  bg="transparent"
                  boxShadow="0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                  borderRadius="4px"
                  boxSize={64}
                  w="100%"
                  position="relative"
                  top="0"
                  transition="ease-in-out 0.6s"
                  _hover={{
                    top: '-2',
                    bg: 'yellow.200'
                  }}
                  _active={{
                    top: '-2',
                    bg: 'yellow.200'
                  }}
                  _before={{
                    borderRadius: '4px',
                    backgroundImage: `url(./${item.img})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.2,
                    zIndex: 0,
                    _hover: {
                      opacity: '1'
                    }
                  }}
                >
                  <Heading zIndex={2} as="h3">
                    {item.title}
                  </Heading>
                </Flex>
              </Link>
            ))}
          </SimpleGrid>

          <Flex flexDir="column" pb={16}>
            <Heading as="h3" pb={12}>
              Take a look at your stats
            </Heading>
            <SimpleGrid
              pb={16}
              gridGap={[12]}
              columns={[1, 2, null, 4]}
              justify="center"
              align="start"
            >
              <Box>
                <Heading as="h5" fontSize={20}>
                  PokéMinigames Persona
                </Heading>
                {!minigames.pokemonIQ ? (
                  <Text>
                    You need to play atleast 3 sessions of each minigame to
                    calculate your Pokémon Persona.{' '}
                    <Link to="/minigames" className="basicLink">
                      Play now
                    </Link>
                  </Text>
                ) : (
                  <Text>
                    Based in your performance you're intelligent as a{' '}
                    <Link
                      to={`/pokemon-list/pokemon-page/${minigames.pokemonIQNr}`}
                      className="basicLink"
                    >
                      {minigames.pokemonIQ}!
                    </Link>
                  </Text>
                )}
              </Box>
              <Box>
                <Heading as="h5" fontSize={20}>
                  Favorite Pokémons
                </Heading>
                <Text>
                  You've <b>{favoritePokemons.length} out of 20</b> in your
                  Favorite Pokémons List
                </Text>
              </Box>
              <Box>
                <Heading as="h5" fontSize={20}>
                  Pokémon Team
                </Heading>
                <Text>
                  You've <b>{favoriteTeam.length} out of 6</b> in your Favorite
                  Pokémons List
                </Text>
              </Box>

              <Box>
                <Heading as="h5" fontSize={20}>
                  Personalities
                </Heading>
                <Box>
                  {getFavoritesMessage[0].includes(
                    "You still haven't added any Pokémon"
                  ) ? (
                    <Text pb={1}>Unknown</Text>
                  ) : (
                    <Text
                      color="blue.400"
                      fontWeight="600"
                      pb={1}
                      transition="all ease-in-out 0.3s"
                    >
                      {getFavoritesMessage[0]}
                    </Text>
                  )}
                  {getTeamMessage[0].includes(
                    "You still haven't added any Pokémon"
                  ) ? (
                    <Text>Unknown</Text>
                  ) : (
                    <Text
                      color="blue.400"
                      fontWeight="600"
                      transition="all ease-in-out 0.3s"
                    >
                      {getTeamMessage[0]}
                    </Text>
                  )}
                </Box>
              </Box>
            </SimpleGrid>
            <Flex justify="center">
              <Link
                to={`/profile/${username}`}
                onClick={() => this.props.getUser(username)}
                className="basicLink"
              >
                <Flex align="center">
                  <Icon mx="2" as={FaPlus} size="3" />{' '}
                  <Text>See in more detail in your profile</Text>
                </Flex>
              </Link>
            </Flex>
          </Flex>

          <Flex flexDir="column">
            <Heading as="h3" pb={12}>
              Community activity
            </Heading>
            {reactionIsLoading ? (
              <Loading />
            ) : !notifications.length ? (
              <Box>We couldn't find any notifications in our database...</Box>
            ) : (
              <SimpleGrid
                gridGap={16}
                columns={[1, null, null, 2]}
                justify="center"
                align="start"
                pb={16}
              >
                {notifications.map((item, key) => (
                  <Flex
                    justify={['center', 'flex-start']}
                    align="center"
                    flexWrap="wrap"
                    w="100%"
                    key={key}
                    gridGap={6}
                  >
                    <Flex
                      w={['100%', null, '15%']}
                      flexDir="column"
                      align="center"
                      justify="center"
                      textAlign="center"
                    >
                      <Link
                        className="basicLink"
                        onClick={() => getUser(item.user)}
                        to={`/pokemon-trainers/profile/${item.user}`}
                      >
                        <Avatar
                          size="lg"
                          bg="#1688b9"
                          objectFit="contain"
                          objectPosition="center"
                          src={`img/avatars/avatar-${item.avatar}.png`}
                          alt={item.avatar}
                        />
                        <Text pt={2}>{item.user}</Text>
                      </Link>
                      <Flex
                        pt={2}
                        flexDir="row"
                        justify="center"
                        align="center"
                      >
                        <FaRegClock />
                        <Text pl={2} fontSize="10px">
                          {moment(item.time.toDate()).fromNow()}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex
                      w={['auto', null, '70%', '75%', '80%']}
                      flexDir="column"
                    >
                      <Text textAlign="left" pb={6}>
                        {item.content}
                      </Text>
                      <ReactionIcons
                        notificationItem={item}
                        profile={profileContent}
                      />
                    </Flex>
                  </Flex>
                ))}
              </SimpleGrid>
            )}
          </Flex>
        </>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    reactionIsLoading: state.notifications.isReactionLoading,
    profileContent: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUser: user => dispatch(getUser(user)),
    getInfoPokemonPage: pokemon => dispatch(getInfoPokemonPage(pokemon))
  };
};

export default compose(
  firestoreConnect([
    { collection: 'notifications', orderBy: ['time', 'desc'], limit: 6 }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(UserHome);
