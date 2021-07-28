import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Flex
      flexDir="column"
      boxSize="100%"
      h="100%"
      justify="center"
      align="center"
    >
      <div className="pokeball poke animated infinite swing">
        <div className="pokeball-inside"></div>
        <div className="pokeball-btn"></div>
      </div>
    </Flex>
  )
}

export default Loading
