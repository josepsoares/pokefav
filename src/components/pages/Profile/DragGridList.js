import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { Box, Flex, Grid, Icon, Text } from '@chakra-ui/react';
import { CgPokemon } from 'react-icons/cg';

import DraggableItem from 'components/layout/DraggableItem';
import { createRange } from 'utils/createRange';

const DragGridList = ({ data, updateListFunc, funcPokemonAlert, list }) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  console.log(data.length);

  console.log(data);

  const [items, setItems] = useState(() =>
    createRange(data.length, index => {
      const { id, ...dataWithoutPokeId } = data[index];

      return {
        id: (index + 1).toString(),
        pokemonId: id,
        ...dataWithoutPokeId
      };
    })
  );

  function handleDragStart({ active }) {
    setActiveId(active.id);
  }

  function handleDragEnd({ over }) {
    const newItems = arrayMove(
      items,
      items.findIndex(i => i.id === activeId),
      items.findIndex(i => i.id === over.id)
    );

    setItems(newItems);

    const getFormattedArrayToUpdate = newItems.map(i => {
      const { id, pokemonId, ...dataWithoutSortingId } = i;

      return dataWithoutSortingId?.isEmpty
        ? {
            ...dataWithoutSortingId
          }
        : {
            id: pokemonId,
            ...dataWithoutSortingId
          };
    });

    updateListFunc(getFormattedArrayToUpdate);
    setActiveId(null);
  }

  return (
    <Flex w="100%">
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={rectSortingStrategy} items={items}>
          <Grid
            w="100%"
            gridGap={[4, 2]}
            justifyItems="center"
            templateColumns={[
              'repeat(auto-fit, minmax(145px, 1fr))',
              null,
              'repeat(3, 1fr)',
              'repeat(6, 1fr)'
            ]}
          >
            {items.map(item => {
              if (item?.isEmpty) {
                return (
                  <Flex
                    w="100%"
                    key={item.id}
                    flexDir="column"
                    align="center"
                    position="relative"
                    opacity="0.25"
                    p="1rem 0"
                    cursor="not-allowed"
                  >
                    <Box boxSize="110px" position="relative" />
                    <Icon
                      position="absolute"
                      boxSize="10rem"
                      top="39%"
                      left="50%"
                      opacity="0.5"
                      transform="translate(-50%, -50%)"
                      as={CgPokemon}
                    />
                    <Text
                      letterSpacing="0.1em"
                      fontFamily="'Rubick', sans-serif"
                      pt={6}
                    >
                      ---
                    </Text>
                  </Flex>
                );
              } else {
                return (
                  <Flex justify="center" key={item.id} position="relative">
                    <DraggableItem key={item.id} id={item.id} item={item} />
                  </Flex>
                );
              }
            })}
          </Grid>
        </SortableContext>
      </DndContext>
    </Flex>
  );
};

export default DragGridList;
