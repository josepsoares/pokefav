import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { FaDna, FaGraduationCap, FaRegHandPointDown } from 'react-icons/fa';
import { GiMineExplosion } from 'react-icons/gi';

import SEO from 'components/Seo';

const PokemonMinigames = () => {
  const location = useLocation();
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
  ];

  return (
    <>
      <SEO
        title="PokéMinigames"
        description="A set of minigames for you to challenge your pokémon knowledge"
      />

      <Heading as="h1" fontSize="5xl" pb={8}>
        PokéMinigames
      </Heading>
      <Heading as="h2" pb={8}>
        Let's get started with your PokéFav experience by exploring one of the
        options bellow! <FaRegHandPointDown style={{ display: 'inline' }} />
      </Heading>

      <SimpleGrid pt={10} pb={20} columns={[1, null, null, 3]} gridGap={8}>
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
                bg: 'yellow.200',
                color: 'red.400'
              }}
              _active={{
                top: '-2',
                bg: 'yellow.200',
                color: 'red.400'
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
              <Heading zIndex="2" as="h3">
                {item.title}
              </Heading>
              <Text zIndex="2">{item.description}</Text>
            </Flex>
          </Link>
        ))}
      </SimpleGrid>
    </>
  );
};

export default PokemonMinigames;
