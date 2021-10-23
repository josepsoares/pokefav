import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

import { CSS } from '@dnd-kit/utilities';
import { Grid, Box } from '@chakra-ui/react';

const defaultAnimateLayoutChanges = ({
  containerId,
  isSorting,
  wasDragging,
  index,
  items,
  newIndex,
  previousItems,
  previousContainerId,
  transition
}) => {
  if (!transition || !wasDragging) {
    return false;
  }

  if (previousItems !== items && index === newIndex) {
    return false;
  }

  if (isSorting) {
    return true;
  }

  return newIndex !== index && containerId === previousContainerId;
};

export const defaultTransition = {
  duration: 200,
  easing: 'ease'
};

export const transitionProperty = 'transform';

export const disabledTransition = CSS.Transition.toString({
  property: transitionProperty,
  duration: 0,
  easing: 'linear'
});

export const defaultAttributes = {
  roleDescription: 'sortable'
};

const animateLayoutChanges = args =>
  args.isSorting || args.wasDragging ? defaultAnimateLayoutChanges(args) : true;

const DroppableContainer = ({
  children,
  columns = 1,
  disabled,
  id,
  items,
  style,
  ...props
}) => {
  const {
    active,
    attributes,
    isDragging,
    listeners,
    over,
    setNodeRef,
    transition,
    transform
  } = useSortable({
    id,
    data: {
      type: 'container'
    },
    animateLayoutChanges
  });
  const isOverContainer = over
    ? (id === over.id && active?.data.current?.type !== 'container') ||
      items.includes(over.id)
    : false;

  return (
    <Grid
      py={4}
      ref={disabled ? undefined : setNodeRef}
      justifyContent="center"
      justifyItems="center"
      gridTemplateColumns="repeat(auto-fill, 200px)"
      border="2px white solid"
      borderRadius="5px"
      style={{
        ...style,
        transition,
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.5 : undefined
      }}
      hover={isOverContainer}
      handleProps={{
        ...attributes,
        ...listeners
      }}
      columns={columns}
      {...props}
    >
      {children}
    </Grid>
  );
};

export default DroppableContainer;
