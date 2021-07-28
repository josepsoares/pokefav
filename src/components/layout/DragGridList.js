import React, { useState } from 'react'
import { motion } from 'framer-motion'
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
} from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable'
import {
  Box,
  Flex,
  Grid,
  Icon,
  IconButton,
  Image,
  Text
} from '@chakra-ui/react'
import PokemonImage from 'components/layout/PokemonImage'
import { FaTrashAlt } from 'react-icons/fa'
import { CgPokemon } from 'react-icons/cg'

const DragGridList = ({ data, updateListFunc, funcPokemonAlert, list }) => {
  const [activeId, setActiveId] = useState(null)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

  function handleDragStart({ active }) {
    console.log('teste start')
    setActiveId(active.id)
  }

  function handleDragEnd({ over }) {
    console.log(over)
    console.log('teste end')
    updateListFunc(
      arrayMove(data, data.indexOf(activeId), data.indexOf(over.id))
    )
    setActiveId(null)
  }

  return (
    <Flex>
      <DndContext
        collisionDetection={closestCenter}
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext strategy={rectSortingStrategy} items={data}>
          <Grid
            w="100%"
            gridGap={[4, 2]}
            templateColumns={[
              'repeat(auto-fit, minmax(145px, 1fr))',
              null,
              'repeat(3, 1fr)',
              'repeat(6, 1fr)'
            ]}
          >
            {data.map((item, id) =>
              item?.isEmpty ? (
                <Flex
                  key={id}
                  flexDir="column"
                  align="center"
                  position="relative"
                  opacity="0.25"
                  p="1rem 0"
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
              ) : (
                <Item
                  key={id}
                  id={id}
                  item={item}
                  listType={list}
                  setRemoveAlert={funcPokemonAlert}
                />
              )
            )}
          </Grid>
        </SortableContext>
      </DndContext>
    </Flex>
  )
}

function Item({ id, item, listType, setRemoveAlert }) {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    isDragging
  } = useSortable({
    id,
    transition: null
  })

  console.log('isDragging =>', isDragging, id)
  console.log(transform)

  return (
    <motion.div
      key={id}
      style={{
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
  )
}

export default DragGridList
