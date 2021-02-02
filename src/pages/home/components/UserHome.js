import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {
  Box,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  Image,
  HStack,
  VStack,
  Avatar
} from '@chakra-ui/react'

import {
  getUserAndPokemonForProfileIQ,
  getInfoPokemonPage
} from 'redux/actions/apiActions'
import Loading from 'components/feedback/Loading'
import ReactionIcons from 'components/layout/ReactionIcons'
import { FaRegClock } from 'react-icons/fa'

class UserHome extends Component {
  render() {
    const {
      profileContent,
      notifications,
      getUserAndPokemonForProfileIQ,
      reactionIsLoading
    } = this.props
    const { username } = profileContent

    console.log(profileContent)

    //const getFavoritesMessage = getStatsMessages(favoritePokemons, 'favorites')
    //const getTeamMessage = getStatsMessages(favoriteTeam, 'team')

    /*     const statsUser = [
      ['No. of Favorite Pokemons', favoritePokemons.length],
      ['No. of Favorite Pokemon Team', favoriteTeam.length],
      ['Personality Trait', getFavoritesMessage[0]],
      ['Battle Personality Trait', getTeamMessage[0]]
    ]

    const triviaUser = [
      ['No. of Realized Trivias', triviaRecord.realizedTrivias],
      ['No. of Correct Answers', triviaRecord.correctAnswers],
      ['No. of Wrong Answers', triviaRecord.wrongAnswers]
    ] */

    const mainItems = [
      {
        title: 'Explore the PokéList',
        link: '/pokemon-list',
        img: 'img/pokelist-smaller.jpg'
      },
      {
        title: 'Play PokéTrivia',
        link: '/pokemon-trivia',
        img: 'img/poketrivia.jpg'
      },
      {
        title: 'Checkout the Community',
        link: '/pokemon-trainers',
        img: 'img/pokecommunity.png'
      }
    ]

    if (!notifications) {
      return <Loading />
    } else {
      return (
        <>
          <Heading as="h1" pb={8}>
            Welcome {username}!
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
                  bg="white"
                  boxShadow="0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)"
                  borderRadius="4px"
                >
                  <Image pb={4} h={20} objectFit="contain" src={item.img} />
                  <Heading as="h4">{item.title}</Heading>
                </Flex>
              </Link>
            ))}
          </SimpleGrid>

          <Flex pb={16}>
            <Heading as="h3" pb={12}>
              Your last activity
            </Heading>
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
              <VStack spacing={[20, null, 12]}>
                {notifications.map((item, key) => (
                  <Flex
                    justify={['center', 'flex-start']}
                    align="center"
                    flexWrap="wrap"
                    w="100%"
                    key={key}
                    gridGap={10}
                  >
                    <Flex
                      w={['100%', null, '15%']}
                      as={Link}
                      flexDir="column"
                      align="center"
                      justify="center"
                      textAlign="center"
                      onClick={() => getUserAndPokemonForProfileIQ(item.user)}
                      to={`/pokemon-trainers/profile/${item.user}`}
                    >
                      <Avatar
                        size="lg"
                        objectFit="contain"
                        objectPosition="center"
                        src={`https://www.serebii.net/diamondpearl/avatar/${item.avatar}.png`}
                        alt={item.avatar}
                      />
                      <Text pt={2}>{item.user}</Text>
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
              </VStack>
            )}
          </Flex>
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications,
    reactionIsLoading: state.notifications.isReactionLoading,
    profileContent: state.firebase.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getUserAndPokemonForProfileIQ: user =>
      dispatch(getUserAndPokemonForProfileIQ(user)),
    getInfoPokemonPage: pokemon => dispatch(getInfoPokemonPage(pokemon))
  }
}

export default compose(
  firestoreConnect([
    { collection: 'notifications', orderBy: ['time', 'desc'], limit: 6 }
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(UserHome)
