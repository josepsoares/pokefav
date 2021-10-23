import React from 'react';
import { Flex, Heading, Image } from '@chakra-ui/react';
import { FaRedoAlt } from 'react-icons/fa';
import Button from 'components/layout/Button';

const Error = ({
  message = 'An error occurred',
  direction = 'column',
  size = '200px'
}) => {
  return (
    <Flex justify="center" align="center" flexDir={direction} pb={8}>
      <Image
        pb={6}
        h={size}
        objectFit="contain"
        objectPosition="center"
        src="/img/psyduck.png"
      />
      <Flex align="center" flexDir="column">
        <Heading pb={4} as="h2">
          {message}
        </Heading>
        <Heading as="h4" pb={6}>
          {/* {props.error} */}
        </Heading>

        <Button
          colorScheme="blue"
          leftIcon={<FaRedoAlt />}
          onClick={() => window.location.reload()}
        >
          Refresh the page
        </Button>
      </Flex>
    </Flex>
  );
};

export default Error;
