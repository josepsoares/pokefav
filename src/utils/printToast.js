import React from 'react';
import { toast } from 'react-toastify';
import { Flex, Icon, Text } from '@chakra-ui/react';
import {
  FiAlertTriangle,
  FiXCircle,
  FiCheck,
  FiAlertCircle
} from 'react-icons/fi';

const PrintToast = (type, message) => {
  switch (type) {
    case 'warning':
      return toast.warning(
        <Flex flexDir="row" align="center">
          <Icon mr={4} fontSize={28} as={FiAlertTriangle} />
          <Text>{message}</Text>
        </Flex>
      );
    case 'error':
      return toast.error(
        <Flex flexDir="row" align="center">
          <Icon mr={4} as={FiXCircle} />
          <Text>{message}</Text>
        </Flex>
      );
    case 'success':
      return toast.success(
        <Flex flexDir="row" align="center">
          <Icon mr={4} fontSize={28} as={FiCheck} />
          <Text>{message}</Text>
        </Flex>
      );
    case 'info':
      return toast.info(
        <Flex flexDir="row" align="center">
          <Icon mr={4} fontSize={28} as={FiAlertCircle} />
          <Text>{message}</Text>
        </Flex>
      );
    case 'dark':
      return toast.dark(<Text>{message}</Text>);
    default:
      return toast(message);
  }
};

export default PrintToast;
