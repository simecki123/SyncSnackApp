import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Text } from '@chakra-ui/react';
import clsx from 'clsx';

export default function Droppable() {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  console.log(isOver, 'fkaljkf')

  return (
    <div ref={setNodeRef} style={style}>
      <Text className={clsx('p-20', {
        'bg-red-300': isOver
      })}>YES</Text>
    </div>
  );
}
