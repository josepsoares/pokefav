import React, { forwardRef } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import _ from 'lodash'

const Button = forwardRef((props, ref) => {
  const propsForButton = _.omit(props, 'children')

  return (
    <ChakraButton
      {...propsForButton}
      ref={ref}
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
})

export default Button
