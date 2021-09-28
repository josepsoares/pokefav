import React from 'react';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
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
      <Box>
        <Heading pb={4} as="h2">
          {message}
        </Heading>
        <Heading as="h2" pb={8}>
          {/* {props.error} */}
        </Heading>

        <Button
          colorScheme="blue"
          leftIcon={<FaRedoAlt />}
          onClick={() => window.location.reload()}
        >
          Refresh the page
        </Button>
      </Box>
    </Flex>
  );
};

export default Error;
