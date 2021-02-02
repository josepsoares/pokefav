import React from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
import Button from 'components/layout/Button'
import { FaRedoAlt } from 'react-icons/fa'

const Error = props => {
  return (
    <Flex justify="center" align="center" flexDir="column" pb={8}>
      <Image
        h="200px"
        pb={6}
        objectFit="contain"
        objectPosition="center"
        src="/img/Box_XD_054.png"
      />
      <Heading pb={4} as="h2">
        An error occurred
      </Heading>
      <Heading as="h2" pb={8}>
        {props.error}
      </Heading>

      <Button
        colorScheme="blue"
        leftIcon={<FaRedoAlt />}
        onClick={() => window.location.reload()}
      >
        Refresh the page
      </Button>
    </Flex>
  )
}

export default Error
