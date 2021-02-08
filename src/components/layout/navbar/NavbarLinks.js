import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getUser, signOut } from 'redux/actions/userActions'
import { getPokedex, getDataPokeListPage } from 'redux/actions/apiActions'
import {
  FaGraduationCap,
  FaHome,
  FaSignOutAlt,
  FaUser,
  FaUsers
} from 'react-icons/fa'
import { Avatar, Menu, MenuList, MenuButton, Box } from '@chakra-ui/react'
import { CgPokemon } from 'react-icons/cg'

import useWindowSize from 'scripts/hooks/useWindowSize'

const NavbarLinks = ({ profile }) => {
  const { username, avatar } = profile
  const { width } = useWindowSize()
  const dispatch = useDispatch()

  return (
    <>
      <NavLink
        exact
        to="/"
        className="nav-link"
        activeClassName="nav-link-active"
      >
        <Box>
          <FaHome />
        </Box>
        <Box as="span">Home</Box>
      </NavLink>
      <NavLink
        exact
        to="/pokemon-list"
        className="nav-link"
        activeClassName="nav-link-active"
        isActive={(match, location) => {
          const string = '/pokemon-list'
          const searchPokemonListURL = location.pathname.match(string)
          if (searchPokemonListURL !== null) {
            return true
          }
        }}
      >
        <Box>
          <CgPokemon />
        </Box>
        <Box as="span">PokéList</Box>
      </NavLink>

      <NavLink
        exact
        to="/pokemon-trivia"
        className="nav-link"
        activeClassName="nav-link-active"
      >
        <Box>
          <FaGraduationCap />
        </Box>
        <Box as="span">PokéTrivia</Box>
      </NavLink>
      <NavLink
        to="/pokemon-trainers"
        className="nav-link"
        activeClassName="nav-link-active"
      >
        <Box>
          <FaUsers />
        </Box>
        <Box as="span">PokéTrainers</Box>
      </NavLink>
      {width > 1024 && (
        <Menu>
          <MenuButton>
            <Avatar
              bg="#1688b9"
              boxSize={14}
              src={`/img/avatars/avatar-${avatar}.png`}
            />
          </MenuButton>
          <MenuList zIndex="5" color="#3c3c3b" bgColor="#ebebd3" p={0}>
            <NavLink
              to={`/profile/${username}`}
              className="nav-link"
              onClick={() => dispatch(getUser(username))}
            >
              <Box>
                <FaUser />
              </Box>
              <Box as="span">Profile</Box>
            </NavLink>
            <NavLink
              to="/"
              onClick={() => dispatch(signOut())}
              className="nav-link"
            >
              <Box>
                <FaSignOutAlt />
              </Box>
              <Box as="span">Logout</Box>
            </NavLink>
          </MenuList>
        </Menu>
      )}
    </>
  )
}

export default NavbarLinks
