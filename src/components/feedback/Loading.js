import React from 'react'
import { Flex, Box } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Flex flexDir="column" boxSize="100%" justify="center" align="center">
      <Box>
        <div className="pokeball poke animated infinite swing">
          <div className="pokeball-inside"></div>
          <div className="pokeball-btn"></div>
        </div>
      </Box>
    </Flex>
  )
}

{
  /* <Flex
      display={pokeballAnimation ? 'none' : 'flex'}
      minH="100%"
      align="center"
      justify="center"
    >
      <motion.div
        animate={{
          transformOrigin: 'bottom center',
          transform: [
            'rotate3d(0, 0, 1, 0deg)',
            'rotate3d(0, 0, 1, 15deg)',
            'rotate3d(0, 0, 1, -10deg)',
            'rotate3d(0, 0, 1, 5deg)',
            'rotate3d(0, 0, 1, -5deg)',
            'rotate3d(0, 0, 1, 0deg)'
          ]
        }}
        transition={{
          duration: 2,
          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          ease: 'easeInOut'
        }}
        onAnimationComplete={() => setPokeballAnimation(true)}
        className="pokeball poke animated infinite swing"
      >
        <div className="pokeball-btn"></div>
      </motion.div>
    </Flex>
  const [pokeballAnimation, setPokeballAnimation] = useState(false)

    */
}

export default Loading
