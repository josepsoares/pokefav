import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/actions/userActions';
import { signOut } from 'redux/actions/authActions';

import { Link, NavLink } from 'react-router-dom';
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
  Image,
  Icon,
  Avatar,
  Divider,
  Box
} from '@chakra-ui/react';
import { BiMenu } from 'react-icons/bi';
import { FaSignOutAlt, FaUser } from 'react-icons/fa';

import useWindowSize from 'utils/hooks/useWindowSize';
import NavbarLinks from 'components/layout/navbar/NavbarLinks';

const NavBar = () => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false);
  const profile = useSelector(state => state.firebase.profile);
  const { width } = useWindowSize();

  const toggleOpen = () => {
    setOpen(!isOpen);
  };

  return width > 1024 ? (
    <Flex
      p={[8, 10]}
      px={[8, null, 20]}
      w="100%"
      as="nav"
      flexDir="row"
      justify="space-between"
      align="center"
    >
      <Link to="/">
        <Image
          h={10}
          objectFit="contain"
          alt="Pokéfav"
          src="/img/logo/pokefav-full-title.svg"
        />
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
        className="nav-link"
        variant="unstyled"
        icon={<Icon boxSize={10} as={BiMenu} />}
        onClick={() => toggleOpen()}
        mr={[2, 4, 6]}
        sx={{ padding: '0 0.5rem' }}
      />
      <Link to="/">
        <Image
          h={10}
          objectFit="contain"
          alt="Pokéfav"
          src="/img/logo/pokefav-full-title.svg"
        />
      </Link>
      <Drawer isOpen={isOpen} placement="left" onClose={() => toggleOpen()}>
        <DrawerOverlay />
        <DrawerContent color="#3c3c3b" bgColor="#ebebd3">
          <DrawerCloseButton />
          <DrawerHeader
            display="flex"
            flexDir="column"
            alignItems="center"
            pt={8}
          >
            <Avatar
              mb={4}
              bg="#1688b9"
              boxSize={14}
              src={`/img/avatars/avatar-${profile.avatar}.png`}
            />
            <Heading as="h4">{profile?.username}</Heading>

            <NavLink
              to={`/profile/${profile.username}`}
              className="nav-link"
              onClick={() => dispatch(getUser(profile.username))}
            >
              <Box>
                <FaUser size={16} />
              </Box>
              <Box fontSize={18} as="span">
                Profile
              </Box>
            </NavLink>
            <NavLink
              to="/"
              onClick={() => dispatch(signOut())}
              className="nav-link"
            >
              <Box>
                <FaSignOutAlt size={16} />
              </Box>
              <Box fontSize={18} as="span">
                Logout
              </Box>
            </NavLink>
          </DrawerHeader>

          <Box p={6} pt={2}>
            <Divider bgColor="#1688b9" h={1} />
          </Box>

          <DrawerBody textAlign="left">
            <NavbarLinks profile={profile} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default NavBar;
