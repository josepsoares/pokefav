import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserAndPokemonForProfileIQ } from 'redux/actions/apiActions'

import { Link, NavLink } from 'react-router-dom'
import {
  Flex,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Heading,
  Text,
  Image,
  Stack,
  Icon,
  Avatar
} from '@chakra-ui/react'
import PokeFavLogo from 'assets/imgs/pokefav-full-title.svg'

import useWindowSize from 'scripts/hooks/useWindowSize'
import NavbarLinks from 'components/layout/navbar/NavbarLinks'
import { BiMenu } from 'react-icons/bi'
import { FaSignOutAlt } from 'react-icons/fa'
import { signOut } from 'redux/actions/authActions'
import Button from '../Button'

const NavBar = () => {
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const { width } = useWindowSize()

  const toggleOpen = () => {
    setOpen(!isOpen)
  }

  return width > 1024 ? (
    <Flex
      p={[8, 10]}
      w="100%"
      as="nav"
      flexDir="row"
      justify="space-between"
      align="center"
    >
      <Link to="/">
        <Image h={10} objectFit="contain" alt="Pokéfav" src={PokeFavLogo} />
      </Link>
      <Flex
        gridGap={4}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <NavbarLinks profile={profile} />
      </Flex>
    </Flex>
  ) : (
    <Flex p={[8, 10]} w="100%" as="nav" align="center" justify="flex-start">
      <IconButton
        variant="ghost"
        icon={<Icon boxSize={10} as={BiMenu} />}
        onClick={() => toggleOpen()}
        type="button"
        mr={6}
      />
      <Link className="navBrandLink" to="/">
        <Image h={10} objectFit="contain" alt="Pokéfav" src={PokeFavLogo} />
      </Link>
      <Drawer isOpen={isOpen} placement="left" onClose={() => toggleOpen()}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Avatar
              size="sm"
              src={`https://www.serebii.net/diamondpearl/avatar/${profile.avatar}.png`}
            />
            <Heading as="h4">{profile?.username}</Heading>

            <Button>
              <NavLink
                to={`/profile/${profile.username}`}
                className="navbar__link"
                activeClassName="navbar__link-active"
                onClick={() =>
                  dispatch(getUserAndPokemonForProfileIQ(profile.username))
                }
              >
                <Text>Profile</Text>
              </NavLink>
            </Button>
            <Button>
              <NavLink
                to="/"
                onClick={() => dispatch(signOut())}
                className="navbar__link"
              >
                <FaSignOutAlt />
              </NavLink>
            </Button>
          </DrawerHeader>
          <DrawerBody>
            <NavbarLinks profile={profile} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

export default NavBar
