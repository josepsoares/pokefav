import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout'
import SEO from 'components/Seo'
import React from 'react'
import { FaDna, FaGraduationCap } from 'react-icons/fa'
import { GiMineExplosion } from 'react-icons/gi'
import { Link, useLocation } from 'react-router-dom'

const PokemonMinigames = () => {
  const location = useLocation()
  const minigames = [
    {
      title: 'PokéTrivia',
      link: '/minigames/pokemon-trivia',
      icon: FaGraduationCap,
      img: 'img/pokelist-smaller.jpg',
      description: 'a trivia of 10 questions to test your pokémon knowledge'
    },
    {
      title: 'PokéTypes',
      link: '/minigames/pokemon-types',
      icon: FaDna,
      img: 'img/pokelist-smaller.jpg',
      description:
        'a timed challenge to test your memory about the types of certain pokémoon'
    },
    {
      title: 'PokéGuess',
      link: '/minigames/pokemon-guess',
      icon: GiMineExplosion,
      img: 'img/pokelist-smaller.jpg',
      description: 'a "who is this pokémon" experience'
    }
  ]

  return (
    <>
      <SEO
        title="PokéMinigames"
        description="A set of minigames for you to challenge your pokémon knowledge"
      />

      <Heading as="h1" pb={8}>
        PokéMinigames
      </Heading>
      <SimpleGrid columns={[1, null, null, 2]} justify="center" gridGap={6}>
        <Box order={[2, null, null, 1]}>
          <Heading as="h4">
            Do you think you know your fair share of knowledge of the Pokémon
            universe?{' '}
          </Heading>
          <Text pb={4}>
            How about testing those skills by playing this Trivia, made by us,
            in order to determine what Pokémon you would be based on your
            intelligence?
          </Text>

          <Text pb={4}>
            To find the answer just starting playing the trivia that consists in
            10 rounds with a question and 4 answers for each round.
          </Text>

          <Text pb={8}>
            Are you an intellectual like Alakazam or Metagross or are you as
            oblivious as Slowpoke or Magikarp? Check out your profile when
            you're done to find out what pokémon are you!
          </Text>
        </Box>
        <Flex justify="center" align="center" order={[1, null, null, 3]}>
          <Image
            maxH="400px"
            maxW="400px"
            objectFit="contain"
            objectPosition="center"
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/065_f2.png"
            alt="Alakazam"
          />
        </Flex>
      </SimpleGrid>
      <SimpleGrid columns={[1, null, 2, 4]} justify="center" gridGap={6}>
        {minigames.map((item, index) => (
          <Link
            key={index}
            to={{
              pathname: item.link,
              state: { prevPath: location.pathname }
            }}
          >
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
              <Text>{item.description}</Text>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    </>
  )
}

export default PokemonMinigames
