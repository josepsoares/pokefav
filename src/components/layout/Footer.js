import { Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex
      textAlign="center"
      flexDir="column"
      justify="center"
      align="center"
      py={6}
    >
      <Text mb={1} fontSize="xxs">
        Pokéfav © 2019-2020 -{' '}
        <a href="https://josepsoares.now.sh/">josepsoares</a>
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
          www.flaticon.com
        </a>{' '}
      </Text>
      <Text mb={1} fontSize="xxs">
        Used content of the Pokémon Universe is used under a Fair Use Policy and
        belongs to Nintendo/Game Freak © 1995-2020.
      </Text>
    </Flex>
  )
}

export default Footer
