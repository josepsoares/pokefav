import { useSortable } from '@dnd-kit/sortable';
import { motion } from 'framer-motion';

import { Box, Flex, Text, Image, Icon } from '@chakra-ui/react';
import { CgPokemon } from 'react-icons/cg';

const DraggableItem = ({ id, item }) => {
  const { attributes, setNodeRef, listeners, transform, isDragging } =
    useSortable({
      id,
      transition: null
    });

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
              scale: isDragging ? 1.2 : 1,
              zIndex: isDragging ? 1 : 0,
              cursor: isDragging ? 'grabbing' : 'grab',
              fontWeight: isDragging ? 'bold' : 'normal'
            }
          : {
              x: 0,
              y: 0,
              scale: 1,
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
      <Flex justify="center" position="relative">
        <Box className="pokemon-image" position="relative">
          <Image
            h="110px"
            w="130px"
            objectFit="scale-down"
            src={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vi/x-y/${item.pokemonId}.png`}
            fallbackSrc={`
        https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${item.pokemonId}.png`}
            alt={item.name}
          />
          <Icon
            as={CgPokemon}
            boxSize="10rem"
            position="absolute"
            top="39%"
            left="50%"
            opacity={isDragging ? 1 : 0.5}
            transform="translate(-50%, -50%)"
            zIndex="-1"
            color={isDragging ? '#f24643' : '#f8f8e6'}
            transition="all ease-in-out 0.3s"
          />
          <Text pt={6}>{item.name}</Text>
        </Box>
      </Flex>
    </motion.div>
  );
};

export default DraggableItem;
