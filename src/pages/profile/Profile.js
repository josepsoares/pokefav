import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import pokemon from 'pokemon'

import {
  getInfoPokemonPage,
  getUserAndPokemonForProfileIQ,
  getRegionsAndGames
} from 'redux/actions/apiActions'
import useWindowSize from 'scripts/hooks/useWindowSize'
import getStatsMessages from 'scripts/getMessageFavoritesTeam'

import {
  Box,
  Flex,
  SimpleGrid,
  Stack,
  Image,
  Divider,
  Heading,
  Text,
  StackDivider
} from '@chakra-ui/react'
import Button from 'components/layout/Button'

const Profile = props => {
  // fazer uma modal para editar o perfil
  const { userInfo, userPokemonIQ, profile } = props
  const {
    username,
    avatar,
    favoriteGame,
    favoriteRegion,
    favoritePokemons,
    favoriteTeam,
    triviaRecord
  } = userInfo
  const { width } = useWindowSize()
  const isUserLoggedInProfile = userInfo.username === profile.username
  const messageFavorites = getStatsMessages(
    userInfo.favoritePokemons,
    'favorites'
  )
  const messageTeam = getStatsMessages(userInfo.favoriteTeam, 'team')
  var pokemonName, description

  if (userPokemonIQ) {
    description = userPokemonIQ.flavor_text_entries.find(
      item => item.language.name === 'en' && item
    )
    pokemonName = pokemon.getName(userPokemonIQ.id)
  } else {
    pokemonName = null
  }

  /* const printPokemon = () => {
    if (!pokemonArray.length) {
      return (
        <p>
          {username} doesn't have any Pokémon in their {actionName}!
        </p>
      )
    } else {
      return (
          {pokemonArray.map((item, key) => (
            <PokemonImage
              key={key}
              pokemonName={item.name}
              pokemonNumber={item.id}
              pokedexSearch={'national'}
              functionPokemon={functionInfoPokemon}
              functionVideo={funtionVideoPokemon}
              lg="2"
            />
          ))}
      )
    }
  } */

  return (
    <>
      <Flex
        align="center"
        flexDir={['column', null, 'row']}
        justify={['center', null, 'space-between']}
        pb={10}
      >
        <Heading pb={[6, null, 0]} as="h1">
          {username}
        </Heading>

        <Stack>
          {isUserLoggedInProfile && (
            <Link to={`/profile/edit/${username}`}>
              <Button>Edit Profile</Button>
            </Link>
          )}
        </Stack>
      </Flex>

      <SimpleGrid
        columns={[1, 2, 3]}
        textAlign="center"
        justify="center"
        align="center"
      >
        {width > 768 && (
          <Box>
            <Image
              alt={avatar}
              src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`}
            />
          </Box>
        )}
        <Box xs="12" md="2" className="p-2 p-md-0">
          <h5 className="col-12">Favorite Game</h5>
          <p className="col-12">{favoriteGame}</p>
        </Box>
        <Box xs="12" md="3" className="p-2 p-md-0">
          <h5 className="col-12">Favorite Generation</h5>
          <p className="col-12">{favoriteRegion}</p>
        </Box>
      </SimpleGrid>

      <Divider my={4} mx="auto" />

      <Box py={4} textAlign="center">
        <Heading as="h3">Favorite Pokémons</Heading>
        <SimpleGrid column={[1, null, 4]} gridGap={6}>
          {/* printPokemons(
          username,
          'Favorite Pokémon List',
          favoritePokemons,
          getInfoPokemonPage,
        ) */}
        </SimpleGrid>
      </Box>
      <Box py={4} textAlign="center">
        <Heading as="h3">Favorite Pokémon Team</Heading>
        <SimpleGrid column={[1, null, 3]} gridGap={6}>
          {/* printPokemons(
          username,
          'Favorite Pokémon Team',
          favoriteTeam,
          getInfoPokemonPage,
        ) */}
        </SimpleGrid>
      </Box>

      <Divider my={10} mx="auto" />

      <SimpleGrid columns={[1, null, 2]} gridGap={10}>
        <Box>
          <Heading textAlign="center" as="h3">
            Personality
          </Heading>
          {favoritePokemons.length !== 0 ? (
            <div>
              <h4>{messageFavorites[0]}</h4>
              <p className="text-left">{messageFavorites[1]}</p>
            </div>
          ) : (
            <p>
              {username} doesn't have any pokémons on their Favorite Pokemons
              List to calculate this result...
            </p>
          )}
        </Box>
        <Box>
          <Heading textAlign="center" as="h3">
            Battle Personality
          </Heading>
          {favoriteTeam.length !== 0 ? (
            <>
              <Heading as="h4">{messageTeam[0]}</Heading>
              <Text textAlign="left">{messageTeam[1]}</Text>
            </>
          ) : (
            <Text>
              {username} doesn't have any pokémons on their Favorite Team to
              calculate this result...
            </Text>
          )}
        </Box>
      </SimpleGrid>

      <Divider my={20} mx="auto" />

      <Flex flexDir="column">
        <Heading as="h4" w="100%">
          PokéTrivia Stats
        </Heading>

        <Stack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          direction={['column', null, 'row']}
        >
          <Flex flexDir="column" align="center">
            <Text fontWeight="bold" pb={2}>
              PokéTrivias played
            </Text>
            <Text>{triviaRecord.realizedTrivias}</Text>
          </Flex>
          <Flex flexDir="column" align="center">
            <Text fontWeight="bold" pb={2}>
              Correct answers
            </Text>
            <Text>{triviaRecord.correctAnswers}</Text>
          </Flex>
          <Flex flexDir="column" align="center">
            <Text fontWeight="bold" pb={2}>
              Incorrect answers
            </Text>
            <Text>{triviaRecord.wrongAnswers}</Text>
          </Flex>
        </Stack>
        {!userPokemonIQ ? (
          <>
            <Heading as="h4">Pokémon IQ</Heading>
            <p className="col-12 pt-4">
              {username} still hasn't played any PokéTrivia to calculte their
              Inner Pokémon IQ...
            </p>
          </>
        ) : (
          <Flex justify="center" align="center">
            <Heading as="h4">Pokémon IQ</Heading>
            <h4>
              {username} is intelligent as a <b>{pokemonName}</b>!
            </h4>
            <Box py={3}>
              <Link
                to={`/pokemon-list/national/pokemon-page/${pokemonName.toLowerCase()}`}
                onClick={() => getInfoPokemonPage(pokemonName.toLowerCase())}
              >
                <Image
                  alt={pokemonName}
                  src={`http://www.pokestadium.com/sprites/xy/${pokemonName.toLowerCase()}.gif`}
                />
              </Link>
            </Box>
            <Box>
              <p>{description.flavor_text}</p>
            </Box>
          </Flex>
        )}
      </Flex>
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    getInfoPokemonPage: pokemon => dispatch(getInfoPokemonPage(pokemon)),
    getUserAndPokemonForProfileIQ: user =>
      dispatch(getUserAndPokemonForProfileIQ(user)),
    getRegionsAndGames: () => dispatch(getRegionsAndGames())
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.firebase.auth.uid,
    profile: state.firebase.profile,
    userInfo: state.apiCalls.apiData.getLinkUserInfo,
    userPokemonIQ: state.apiCalls.apiData.getPokemonIQ
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
