import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import clsx from 'clsx';

export default function Draggable({ isDropped }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;


  return (
    <button className={clsx('bg-blue-300', { 'bg-green-300': isDropped })} ref={setNodeRef} style={style} {...listeners} {...attributes}>
      nice1
    </button>
  );
}
