import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  PointerSensor
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  horizontalListSortingStrategy,
  rectSwappingStrategy,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import {
  Box,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react';
import PokemonImage from 'components/layout/PokemonImage';
import { FaTrashAlt } from 'react-icons/fa';
import { CgPokemon } from 'react-icons/cg';

const defaultInitializer = index => index;

export function createRange(length, initializer = defaultInitializer) {
  return [...new Array(length)].map((_, index) => initializer(index));
}

const DragGridList = ({ data, updateListFunc, funcPokemonAlert, list }) => {
  const [activeId, setActiveId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  /* const [items, setItems] = useState(() =>
    createRange(16, index => (index + 1).toString())
  ); */

  const [items, setItems] = useState(() =>
    createRange(data.length, index => {
      const dataWithoutPokeId = data.map(item => {
        if (item?.id) {
          delete item.id;
          return item;
        } else {
          return item;
        }
      });

      return {
        id: (index + 1).toString(),
        pokemonId: data[index].id,
        ...dataWithoutPokeId[index]
      };
    })
  );

  console.log(items);

  function handleDragStart({ active }) {
    console.log(active);
    setActiveId(active.id);
  }

  function handleDragEnd({ over }) {
    console.log(over);
    console.log('teste end');
    updateListFunc(
      arrayMove(data, data.indexOf(activeId), data.indexOf(over.id))
    );
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
          <Grid>
            {items.map(item => {
              console.log(typeof item.key);
              return <Item key={item.id} id={item.id} />;
            })}
          </Grid>
        </SortableContext>
      </DndContext>
    </Flex>
  );
};

function Item({ id }) {
  const teste = useSortable({
    id,
    transition: null
  });
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({
      id,
      transition: null
    });

  console.log(teste);

  return (
    <motion.div
      style={{
        position: 'relative',
        width: 140,
        height: 140
      }}
      ref={setNodeRef}
      tabIndex={0}
      layoutId={id}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              zIndex: isDragging ? 1 : 0,
              boxShadow: isDragging
                ? '0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)'
                : undefined
            }
          : { x: 0, y: 0, scale: 1 }
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        easings: {
          type: 'spring'
        },
        scale: {
          duration: 0.25
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25
        }
      }}
      {...attributes}
      {...listeners}
    >
      teste
    </motion.div>
  );
}

/* function Item({ id, item, listType, setRemoveAlert }) {
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({
      id,
      transition: null
    });

  console.log('isDragging =>', isDragging, id);
  console.log(transform, attributes);

  return (
    <motion.div
      key={id}
      style={{
        position: 'relative',
        width: 140,
        height: 140,
        zIndex: 0,
        cursor: 'grab',
        touchAction: 'none',
        msTouchAction: 'none'
      }}
      ref={setNodeRef}
      tabIndex={0}
      layoutId={id}
      whileHover={{
        transition: { duration: 1, ease: 'easeInOut' },
        opacity: 1
      }}
      whileTap={{
        transition: { duration: 1, ease: 'easeInOut' },
        opacity: 1
      }}
      animate={
        transform
          ? {
              x: transform.x,
              y: transform.y,
              scale: isDragging ? 1.05 : 1,
              opacity: isDragging ? 1 : 0.8,
              zIndex: isDragging ? 1 : 0,
              cursor: isDragging ? 'grabbing' : 'grab',
              boxShadow: isDragging
                ? '0 0 0 1px rgba(63, 63, 68, 0.05), 0px 15px 15px 0 rgba(34, 33, 81, 0.25)'
                : 'none'
            }
          : {
              x: 0,
              y: 0,
              scale: 1,
              opacity: 0.8,
              boxShadow: 'none',
              cursor: 'grab',
              zIndex: 0
            }
      }
      transition={{
        duration: !isDragging ? 0.25 : 0,
        easings: {
          type: 'spring'
        },
        scale: {
          duration: 0.25
        },
        zIndex: {
          delay: isDragging ? 0 : 0.25
        }
      }}
      {...attributes}
      {...listeners}
    >
      <Flex justify="center" position="relative" p="1rem 0">
        <Box position="relative">
          <Image
            h="110px"
            w="130px"
            objectFit="scale-down"
            src={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${item.id}.png`}
            fallbackSrc={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${item.id}.png`}
            alt={item.name}
          />
          <Icon
            as={CgPokemon}
            boxSize="10rem"
            position="absolute"
            top="39%"
            left="50%"
            opacity="0.5"
            transform="translate(-50%, -50%)"
            zIndex="-1"
          />
          <Text pt={6}>{item.name}</Text>
        </Box>
        <IconButton
          zIndex="3"
          left="70%"
          top="0"
          transitionProperty="all"
          transition="ease-in-out"
          transitionDuration="0.5s"
          fontSize={14}
          bgColor="secondary"
          color="primary"
          position="absolute"
          borderRadius="50%"
          icon={<FaTrashAlt />}
          _hover={{
            fontSize: 20
          }}
          _active={{
            fontSize: 20
          }}
          onClick={() =>
            setRemoveAlert({
              isOpen: true,
              pokemon: item.name,
              type: listType
            })
          }
        />
      </Flex>
    </motion.div>
  );
} */

export default DragGridList;
