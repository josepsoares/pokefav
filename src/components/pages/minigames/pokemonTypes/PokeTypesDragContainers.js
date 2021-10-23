import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  closestCenter,
  defaultDropAnimation,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  LayoutMeasuringStrategy,
  MouseSensor,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { Box, Flex, useTheme } from '@chakra-ui/react';

import _ from 'lodash';

import DraggableItem from 'components/layout/DraggableItem';
import DroppableContainer from 'components/pages/minigames/pokemonTypes/DroppableContainer';
import SortableItem from 'components/pages/minigames/pokemonTypes/SortableItem';
import { createRange } from 'utils/createRange';
import hexToRGB from 'utils/hexToRGB';

export default function PokeTypesDragContainers({
  adjustScale = false,
  cancelDrop,
  columns,
  handle = false,
  items: initialItems,
  containerStyle,
  getItemStyles = () => ({}),
  wrapperStyle = () => ({}),
  strategy = verticalListSortingStrategy,
  minimal = false,
  modifiers,
  renderItem,
  pokemonsByType,
  allPokemons,
  types
}) {
  const theme = useTheme();
  const [items, setItems] = useState(
    () =>
      initialItems ?? [
        createRange(allPokemons.length - 1, index => ({
          id: index + 1,
          ...allPokemons[index]
        })),
        [],
        [],
        [],
        []
      ]
  );

  const [containers, setContainers] = useState(
    Array(5)
      .fill(null)
      .map((_, i) => i)
  );
  const [activeId, setActiveId] = useState(null);
  const lastOverId = useRef(null);
  const recentlyMovedToNewContainer = useRef(false);
  const isSortingContainer = activeId ? containers.includes(activeId) : false;

  // Custom collision detection strategy optimized for multiple containers
  const collisionDetectionStrategy = useCallback(
    args => {
      // Start by finding any intersecting droppable
      let overId = rectIntersection(args);

      if (activeId && activeId in items) {
        return closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(
            container => container.id in items
          )
        });
      }

      if (overId != null) {
        if (overId in items) {
          const containerItems = items[overId];

          // If a container is matched and it contains items (columns 'A', 'B', 'C')
          if (containerItems.length > 0) {
            // Return the closest droppable within that container
            overId = closestCenter({
              ...args,
              droppableContainers: args.droppableContainers.filter(
                container =>
                  container.id !== overId &&
                  containerItems.includes(container.id)
              )
            });
          }
        }

        lastOverId.current = overId;

        return overId;
      }

      // When a draggable item moves to a new container, the layout may shift
      // and the `overId` may become `null`. We manually set the cached `lastOverId`
      // to the id of the draggable item that was moved to the new container, otherwise
      // the previous `overId` will be returned which can cause items to incorrectly shift positions
      if (recentlyMovedToNewContainer.current) {
        lastOverId.current = activeId;
      }

      // If no droppable is matched, return the last match
      return lastOverId.current;
    },
    [activeId, items]
  );
  const [clonedItems, setClonedItems] = useState(null);
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  const findContainer = id => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find(key => items[key].includes(id));
  };

  const getIndex = id => {
    const container = findContainer(id);

    if (!container) {
      return -1;
    }

    const index = items[container].indexOf(id);

    return index;
  };

  const onDragCancel = () => {
    if (clonedItems) {
      // Reset items to their original state in case items have been
      // Dragged across containrs
      setItems(clonedItems);
    }

    setActiveId(null);
    setClonedItems(null);
  };

  useEffect(() => {
    requestAnimationFrame(() => {
      recentlyMovedToNewContainer.current = false;
    });
  }, [items]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      measuring={{
        droppable: {
          strategy: LayoutMeasuringStrategy.Always
        }
      }}
      onDragStart={({ active }) => {
        setActiveId(active.id);
        setClonedItems(items);
      }}
      onDragOver={({ active, over }) => {
        const overId = over?.id;

        if (!overId || active.id in items) {
          return;
        }

        const overContainer = findContainer(overId);
        const activeContainer = findContainer(active.id);

        if (!overContainer || !activeContainer) {
          return;
        }

        if (activeContainer !== overContainer) {
          setItems(items => {
            const activeItems = items[activeContainer];
            const overItems = items[overContainer];
            const overIndex = overItems.indexOf(overId);
            const activeIndex = activeItems.indexOf(active.id);

            let newIndex;

            if (overId in items) {
              newIndex = overItems.length + 1;
            } else {
              const isBelowOverItem =
                over &&
                active.rect.current.translated &&
                active.rect.current.translated.offsetTop >
                  over.rect.offsetTop + over.rect.height;

              const modifier = isBelowOverItem ? 1 : 0;

              newIndex =
                overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
            }

            recentlyMovedToNewContainer.current = true;

            return {
              ...items,
              [activeContainer]: items[activeContainer].filter(
                item => item !== active.id
              ),
              [overContainer]: [
                ...items[overContainer].slice(0, newIndex),
                items[activeContainer][activeIndex],
                ...items[overContainer].slice(
                  newIndex,
                  items[overContainer].length
                )
              ]
            };
          });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (active.id in items && over?.id) {
          setContainers(containers => {
            const activeIndex = containers.indexOf(active.id);
            const overIndex = containers.indexOf(over.id);

            return arrayMove(containers, activeIndex, overIndex);
          });
        }

        const activeContainer = findContainer(active.id);

        if (!activeContainer) {
          setActiveId(null);
          return;
        }

        const overId = over?.id;

        if (!overId) {
          setActiveId(null);
          return;
        }

        const overContainer = findContainer(overId);

        if (overContainer) {
          const activeIndex = items[activeContainer].indexOf(active.id);
          const overIndex = items[overContainer].indexOf(overId);

          if (activeIndex !== overIndex) {
            setItems(items => ({
              ...items,
              [overContainer]: arrayMove(
                items[overContainer],
                activeIndex,
                overIndex
              )
            }));
          }
        }

        setActiveId(null);
      }}
      cancelDrop={cancelDrop}
      onDragCancel={onDragCancel}
      modifiers={modifiers}
    >
      <div
        style={{
          boxSizing: 'border-box',
          padding: 20,
          width: '100%'
        }}
      >
        <SortableContext
          items={[...containers]}
          strategy={horizontalListSortingStrategy}
        >
          {containers.map(containerId => (
            <Flex flexDir="column" pb={8} gridGap="10px">
              {containerId !== 0 && (
                <Flex
                  justify="center"
                  align="center"
                  w={250}
                  h={50}
                  fontSize="2rem"
                  borderRadius="0.25rem"
                  textTransform="uppercase"
                  border="1px solid rgba(0, 0, 0, 0.2)"
                  textShadow="1px 1px 2px rgb(0 0 0 / 70%)"
                  transition="opacity 0.4s"
                  position="relative"
                  bottom="-35px"
                  boxShadow="lg"
                  m="0 auto"
                  bgColor={_.lowerCase(types[_.subtract(containerId, 1)]?.name)}
                >
                  {_.startCase(types[_.subtract(containerId, 1)]?.name)}
                </Flex>
              )}
              <DroppableContainer
                key={containerId}
                id={containerId}
                label={minimal ? undefined : `Column ${containerId}`}
                columns={columns}
                items={items[containerId]}
                style={{
                  minHeight: '170px',
                  backgroundColor: hexToRGB(
                    theme.colors[types[_.subtract(containerId, 1)]?.name],
                    0.2
                  )
                }}
                unstyled={minimal}
              >
                <SortableContext items={items[containerId]} strategy={strategy}>
                  {items[containerId].map((value, index) => {
                    console.log(value);
                    return (
                      <SortableItem
                        item={{
                          pokemonId: value.pokemon.url.split('/')[6],
                          pokemon: value.pokemon.name
                        }}
                        disabled={isSortingContainer}
                        key={value.id}
                        id={value.id}
                        index={index}
                        handle={handle}
                        style={getItemStyles}
                        wrapperStyle={wrapperStyle}
                        renderItem={renderItem}
                        containerId={containerId}
                        getIndex={getIndex}
                      />
                    );
                  })}
                </SortableContext>
              </DroppableContainer>
            </Flex>
          ))}
        </SortableContext>
      </div>
      {createPortal(
        <DragOverlay
          adjustScale={adjustScale}
          dropAnimation={{
            ...defaultDropAnimation,
            dragSourceOpacity: 0.5
          }}
        >
          {activeId
            ? containers.includes(activeId)
              ? renderContainerDragOverlay(activeId)
              : renderSortableItemDragOverlay(activeId)
            : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );

  function renderSortableItemDragOverlay(id) {
    return (
      <DraggableItem
        value={id}
        handle={handle}
        style={getItemStyles({
          containerId: findContainer(id),
          overIndex: -1,
          index: getIndex(id),
          value: id,
          isSorting: true,
          isDragging: true,
          isDragOverlay: true
        })}
        wrapperStyle={wrapperStyle({ index: 0 })}
        renderItem={renderItem}
        dragOverlay
      />
    );
  }

  function renderContainerDragOverlay(containerId) {
    return (
      <Box
        style={{
          height: '100%'
        }}
      >
        {items[containerId].map((item, index) => (
          <DraggableItem
            key={item}
            value={item}
            handle={handle}
            style={getItemStyles({
              containerId,
              overIndex: -1,
              index: getIndex(item),
              value: item,
              isDragging: false,
              isSorting: false,
              isDragOverlay: false
            })}
            wrapperStyle={wrapperStyle({ index })}
            renderItem={renderItem}
          />
        ))}
      </Box>
    );
  }

  function getNextContainerId() {
    const containeIds = Object.keys(items);
    const lastContaineId = containeIds[containeIds.length - 1];

    return String.fromCharCode(lastContaineId.charCodeAt(0) + 1);
  }
}
