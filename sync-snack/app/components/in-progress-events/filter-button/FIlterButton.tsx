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
        "bg-gray-200",
        {
          'bg-orange-200': filter === currentFilter,
        }
      )}

      bg={filter === currentFilter ? 'orange.200' : 'gray.200'}
    >
      {children}
    </Button>
  );
}
