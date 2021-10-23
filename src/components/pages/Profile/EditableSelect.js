import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { Flex, Text, Select } from '@chakra-ui/react';

import { editProfileField } from 'redux/actions/userActions';
import EditableControls from 'components/pages/Profile/EditableControls';

const EditableSelect = ({ initialValue, selectList, fieldType }) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isEditing: false,
    value: initialValue
  });

  return (
    <Flex
      gridGap={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <>
        {state.isEditing ? (
          <Select
            color="#3c3c3b"
            bgColor="#ebebd3"
            sx={{
              option: {
                color: '#3c3c3b !important',
                bgColor: '#ebebd3 !important',
                '&:hover, &:active': {
                  bgColor: 'red !important'
                }
              }
            }}
            defaultValue={state.value}
            onChange={ev => setState({ ...state, value: ev.target.value })}
          >
            {selectList.map((item, index) => (
              <option value={_.startCase(item.name)} key={index}>
                {_.startCase(item.name)}
              </option>
            ))}
          </Select>
        ) : (
          <Text>{state.value}</Text>
        )}
        <EditableControls
          onEdit={() => setState({ ...state, isEditing: true })}
          onCancel={() => setState({ ...state, isEditing: false })}
          isEditing={state.isEditing}
          onSubmit={() => {
            dispatch(editProfileField(fieldType, state.value));
            setState({ ...state, isEditing: false });
          }}
        />
      </>
    </Flex>
  );
};

export default EditableSelect;
