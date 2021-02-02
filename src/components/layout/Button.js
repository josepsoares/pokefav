import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import _ from 'lodash'

const Button = props => {
  const propsForButton = _.omit(props, 'children')

  return (
    <ChakraButton
      {...propsForButton}
      className="btn"
      boxShadow="md"
      borderRadius="5px"
      position="relative"
      _hover={{
        bg: props.bg
      }}
    >
      <span>{props.children}</span>
    </ChakraButton>
  )
}

export default Button
