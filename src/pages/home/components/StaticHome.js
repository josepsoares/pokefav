import React, { useEffect, useRef, useState } from 'react'
import {
  Box,
  Image,
  Flex,
  SimpleGrid,
  Heading,
  Text,
  ButtonGroup
} from '@chakra-ui/react'
import Button from 'components/layout/Button'
import Login from 'pages/auth/Login'
import Register from 'pages/auth/Register'
import { motion } from 'framer-motion'
import { useIntersection } from 'react-use'
import { BiLogInCircle, BiIdCard } from 'react-icons/bi'

const pokeFavFeatures = [
  {
    img: 'xy_wallpaper4_1920x1200.jpg',
    title: 'create your pokélist, pokéteam and pokécardlist',
    description: ''
  },
  {
    img: 'xy05-wallpaper3-1920-en.jpg',
    title: 'play a set of challenging minigames',
    description: ''
  },
  {
    img: 'xy_wallpaper5_1920x1200.jpg',
    title: 'discover your poképersonalities, pokémove and pokétype knowledge',
    description: ''
  },
  {
    img: 'xy05-wallpaper4-1920-en.jpg',
    title: 'encounter your favorite pokémon cards',
    description: ''
  }
]

const StaticHome = () => {
  const [state, setState] = useState(0)

  const intersection = {
    root: null,
    rootMargin: '-50px',
    threshold: 0.25
  }

  const loginRef = useRef(null)
  const registerRef = useRef(null)
  const loginIntersection = useIntersection(loginRef, { ...intersection })
  const registerIntersection = useIntersection(registerRef, { ...intersection })

  const scrollToRef = ref => {
    const scrollTo = ref.current.offsetTop + 20
    window.scrollTo({ left: 0, top: scrollTo, behavior: 'smooth' })
  }

  useEffect(() => {
    let timer = setInterval(() => {
      setState(state => {
        if (state >= pokeFavFeatures.length - 1) {
          return 0
        } else {
          return state + 1
        }
      })
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  return (
    <Box minH="100%">
      <Flex
        flexDirection="column"
        textAlign="center"
        justify="center"
        align="center"
        minH="100vh"
        position="relative"
        mb={8}
      >
        <Image
          mb={10}
          zIndex={1}
          h={[16, 20, 40]}
          objectFit="contain"
          alt="Pokéfav"
          src="img/logo/pokefav-full-title.svg"
        />
        <Box position="relative" h="150px" w="100%">
          {pokeFavFeatures.map((item, index) => (
            <motion.div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                height: '125px',
                width: '100%',
                zIndex: 1
              }}
              initial={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              animate={{
                opacity: state === index ? 1 : 0,
                y: state === index ? 1 : -25
              }}
            >
              <Heading as="h6">{item.title}</Heading>
              <Text>{item.description}</Text>
            </motion.div>
          ))}
        </Box>
        {pokeFavFeatures.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: state === index ? 0.15 : 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              backgroundSize: 'cover',
              backgroundImage: `url(img/${item.img})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              opacity: 0.15
            }}
          ></motion.div>
        ))}
        <ButtonGroup spacing={6}>
          <Button
            p={8}
            fontSize="xl"
            bg="tertiary"
            leftIcon={<BiLogInCircle />}
            onClick={() => scrollToRef(loginRef)}
          >
            Login now
          </Button>
          <Button
            p={8}
            fontSize="xl"
            bg="tertiary"
            leftIcon={<BiIdCard />}
            onClick={() => scrollToRef(registerRef)}
          >
            Register now
          </Button>
        </ButtonGroup>
      </Flex>

      <motion.div
        ref={loginRef}
        initial={{ opacity: 0, y: -25 }}
        animate={loginIntersection?.isIntersecting && { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <SimpleGrid
          pt={10}
          mx="auto"
          minH="100vh"
          gridGap={10}
          pb={[10, 8, 4]}
          columns={[1, null, 2]}
          maxW={['90%', '80%', '75%']}
        >
          <Login registerAutoScroll={() => scrollToRef(registerRef)} />
          <Flex align="center" justify="center">
            <Image h={48} objectFit="contain" src="img/pikachu-test.png" />
          </Flex>
        </SimpleGrid>
      </motion.div>

      <motion.div
        ref={registerRef}
        initial={{ opacity: 0, y: -25 }}
        animate={registerIntersection?.isIntersecting && { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <SimpleGrid
          pt={24}
          pb={12}
          mx="auto"
          minH="100vh"
          gridGap={10}
          columns={[1]}
          maxW={['90%', '80%', '75%']}
        >
          <Register />
        </SimpleGrid>
      </motion.div>
    </Box>
  )
}

export default StaticHome
