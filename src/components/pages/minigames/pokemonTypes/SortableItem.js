import React from 'react';
import { useSortable } from '@dnd-kit/sortable';

import DraggableItem from 'components/layout/DraggableItem';
import useMountStatus from 'utils/hooks/useMountStatus';

export default function SortableItem({
  id,
  index,
  handle,
  renderItem,
  style,
  containerId,
  getIndex,
  item,
  wrapperStyle
}) {
  const {
    setNodeRef,
    listeners,
    isDragging,
    isSorting,
    over,
    overIndex,
    transform,
    transition
  } = useSortable({
    id
  });
  const mounted = useMountStatus();
  const mountedWhileDragging = isDragging && !mounted;

  return (
    <DraggableItem
      item={item}
      ref={setNodeRef}
      value={id}
      dragging={isDragging}
      sorting={isSorting}
      handle={handle}
      index={index}
      wrapperStyle={wrapperStyle({ index })}
      style={style({
        index,
        value: id,
        isDragging,
        isSorting,
        overIndex: over ? getIndex(over.id) : overIndex,
        containerId
      })}
      transform={transform}
      fadeIn={mountedWhileDragging}
      listeners={listeners}
      renderItem={renderItem}
    />
  );
}
