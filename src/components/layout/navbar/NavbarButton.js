import React from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import _ from 'lodash'

const NavbarButton = props => {
  const propsForButton = _.omit(props, 'children')

  return (
    <ChakraButton
      {...propsForButton}
      className="btn"
      position="relative"
      _hover={{
        bg: props.bg
      }}
    >
      <span>{props.children}</span>
    </ChakraButton>
  )
}

export default NavbarButton
