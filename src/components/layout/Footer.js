import React from 'react'
import { Flex, Text } from '@chakra-ui/react'

const Footer = () => {
  return (
    <Flex
      textAlign="center"
      flexDir="column"
      justify="center"
      align="center"
      px={10}
      p={6}
    >
      <Text mb={1} fontSize="xxs">
        Pokéfav © 2021 -{' '}
        <a className="basicLink" href="https://josepsoares.now.sh/">
          josepsoares
        </a>
      </Text>
      <Text mb={1} fontSize="xxs">
        Pokémon Reactions Icons made by{' '}
        <a
          className="basicLink"
          href="https://www.flaticon.com/authors/roundicons-freebies"
          title="Roundicons Freebies"
        >
          Roundicons Freebies
        </a>{' '}
        from{' '}
        <a
          className="basicLink"
          href="https://www.flaticon.com/"
          title="Flaticon"
        >
          Flat Icon
        </a>{' '}
      </Text>
      <Text mb={1} fontSize="xxs">
        Used content of the Pokémon Universe is used under a Fair Use Policy and
        belongs to Nintendo/Game Freak © 1995-2021.
      </Text>
    </Flex>
  )
}

export default Footer
