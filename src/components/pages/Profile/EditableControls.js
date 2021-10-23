import React from 'react';
import { Flex, ButtonGroup, IconButton } from '@chakra-ui/react';
import { FaCheck, FaEdit, FaTimes } from 'react-icons/fa';

const EditableControls = ({ onEdit, isEditing, onSubmit, onCancel }) => {
  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        isRound={true}
        colorScheme="green"
        icon={<FaCheck />}
        onClick={onSubmit}
      />
      <IconButton
        isRound={true}
        colorScheme="red"
        icon={<FaTimes />}
        onClick={onCancel}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center">
      <IconButton
        transitionProperty="all"
        transition="ease-in-out"
        transitionDuration="0.3s"
        bgColor="secondary"
        color="primary"
        borderRadius="50%"
        size="md"
        icon={<FaEdit />}
        onClick={onEdit}
        fontSize={14}
        opacity="0.9"
        _hover={{
          opacity: 1,
          fontSize: 18
        }}
        _active={{
          opacity: 1,
          fontSize: 18
        }}
      />
    </Flex>
  );
};

export default EditableControls;
