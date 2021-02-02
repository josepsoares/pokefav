import React from 'react'
import { Box, Flex, Heading, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import SEO from 'components/Seo'

const NoMatch = () => {
  return (
    <>
      <SEO title="Page not found" />
      <Flex justify="center" align="center" flexDir="column" pb={8}>
        <Image
          h="250px"
          pb={6}
          objectFit="contain"
          objectPosition="center"
          src="/img/Box_XD_054.png"
        />
        <Heading pb={4} as="h1">
          Error 404
        </Heading>
        <Heading as="h2" pb={8}>
          Page not found
        </Heading>
        <Flex
          flexDir="row"
          align="center"
          as={Link}
          className="basicLink"
          to="/"
        >
          <Box mx={2} as="span">
            <FaArrowLeft />
          </Box>
          <Box mr={2} as="span">
            Go back to the fronpage
          </Box>
        </Flex>
      </Flex>
    </>
  )
}

export default NoMatch
