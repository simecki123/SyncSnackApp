'use client'
import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import Droppable from './Droppable';
import Draggable from './Draggable';

export default function App() {
  const [isDropped, setIsDropped] = useState(false);

  function handleEndDrag(event: DragEndEvent): void {
    console.log('its dragged')
    setIsDropped(!isDropped)
  }

  return (
    <DndContext onDragEnd={handleEndDrag}>
      <Draggable isDropped={isDropped} />
      <Droppable />
    </DndContext>
  )
}
