import { Button } from "@chakra-ui/react";
import clsx from "clsx";


export default function FilterButton({ filter, currentFilter, onClick, children }: {
  filter: string,
  currentFilter: string,
  onClick: () => void,
  children: React.ReactNode
}) {
  return (
    <Button
      onClick={onClick}
      className={clsx(
        "bg-gray-100",
        {
          'bg-blue-1 text-white': filter === currentFilter,
        }
      )}

      bg={filter === currentFilter ? 'xblue.500' : 'gray.100'}
      textColor={filter === currentFilter ? 'white' : 'black'}
    >
      {children}
    </Button>
  );
}
