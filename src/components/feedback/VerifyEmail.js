import React from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Heading, Text, Image, Stack } from '@chakra-ui/react';
import { FaRedoAlt, FaSignOutAlt } from 'react-icons/fa';

import { signOut } from 'redux/actions/authActions';
import Button from 'components/layout/Button';

const VerifyEmail = () => {
  const dispatch = useDispatch();

  return (
    <Flex justify="center" align="center" flexDir="column" w="100%" pb={8}>
      <Image
        h="300px"
        objectFit="contain"
        objectPosition="center"
        src="/img/psyduck.png"
      />
      <Flex pt={4} align="center" flexDir="column">
        <Heading pb={4} as="h2">
          You haven't verified your email yet
        </Heading>
        <Text pb={6}>
          To start enjoying Pokéfav to its fullest please verify your email
          through the link it was sent to your email
        </Text>

        <Flex
          direction="row"
          wrap="wrap"
          pt={6}
          gridGap="24px"
          justify="center"
          align="center"
        >
          <Button
            colorScheme="blue"
            leftIcon={<FaRedoAlt />}
            onClick={() => window.location.reload()}
          >
            Refresh the page
          </Button>
          <Button
            colorScheme="blue"
            leftIcon={<FaSignOutAlt />}
            onClick={() => dispatch(signOut())}
          >
            Logout
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default VerifyEmail;
