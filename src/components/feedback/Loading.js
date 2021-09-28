import React from 'react';
import { Flex } from '@chakra-ui/react';

const Loading = ({ size = '100%' }) => {
  return (
    <Flex
      h="100%"
      flexDir="column"
      boxSize={size}
      justify="center"
      align="center"
    >
      <div className="pokeball poke animated infinite swing">
        <div className="pokeball-inside"></div>
        <div className="pokeball-btn"></div>
      </div>
    </Flex>
  );
};

export default Loading;
