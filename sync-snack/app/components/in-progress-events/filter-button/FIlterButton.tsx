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
          'bg-orange-light-1': filter === currentFilter,
        }
      )}

      bg={filter === currentFilter ? 'xorange.500' : 'gray.100'}
    >
      {children}
    </Button>
  );
}
