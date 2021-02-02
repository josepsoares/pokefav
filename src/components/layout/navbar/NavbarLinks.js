import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from 'redux/actions/authActions'
import { getUserAndPokemonForProfileIQ } from 'redux/actions/apiActions'
import useWindowSize from 'scripts/hooks/useWindowSize'
import { getPokedex } from 'redux/actions/apiActions'
import { getDataPokeListPage } from 'redux/actions/apiActions'
import { FaGraduationCap, FaHome, FaSignOutAlt, FaUsers } from 'react-icons/fa'
import { Avatar, Menu, MenuList, MenuButton, MenuItem } from '@chakra-ui/react'
import { CgPokemon } from 'react-icons/cg'

import Button from '../Button'

const NavbarLinks = ({ profile }) => {
  const { username, avatar } = profile
  const { width } = useWindowSize()
  const dispatch = useDispatch()

  return (
    <>
      <NavLink
        exact
        activeClassName="navbar__link-active"
        className="navbar__link"
        to="/"
      >
        <Button leftIcon={<FaHome />} variant="ghost">
          Home
        </Button>
      </NavLink>
      <NavLink
        exact
        activeClassName="navbar__link-active"
        className="navbar__link"
        to="/pokemon-list"
        isActive={(match, location) => {
          const string = '/pokemon-list'
          const searchPokemonListURL = location.pathname.match(string)
          if (searchPokemonListURL !== null) {
            return true
          }
        }}
      >
        <Button leftIcon={<CgPokemon />} variant="ghost">
          PokéList
        </Button>
      </NavLink>

      <NavLink
        exact
        to="/pokemon-trivia"
        className="navbar__link"
        activeClassName="navbar__link-active"
      >
        <Button leftIcon={<FaGraduationCap />} variant="ghost">
          PokéTrivia
        </Button>
      </NavLink>
      <NavLink
        to="/pokemon-trainers"
        className="navbar__link"
        activeClassName="navbar__link-active"
      >
        <Button leftIcon={<FaUsers />} variant="ghost">
          PokéTrainers
        </Button>
      </NavLink>
      {width > 1024 && (
        <Menu>
          <MenuButton>
            <Avatar
              size="sm"
              src={`https://www.serebii.net/diamondpearl/avatar/${avatar}.png`}
            />
          </MenuButton>
          <MenuList p={0}>
            <MenuItem>
              <NavLink
                to={`/profile/${username}`}
                className="navbar__link"
                activeClassName="navbar__link-active"
                onClick={() =>
                  dispatch(getUserAndPokemonForProfileIQ(username))
                }
              >
                Profile
              </NavLink>
            </MenuItem>
            <MenuItem>
              <NavLink
                to="/"
                onClick={() => dispatch(signOut())}
                className="navbar__link"
              >
                <FaSignOutAlt />
              </NavLink>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  )
}

export default NavbarLinks
