import { Button } from "@chakra-ui/react";


export default function FilterButton({ filter, currentFilter, onClick, children }: {
    filter: string,
    currentFilter: string,
    onClick: () => void,
    children: React.ReactNode
  }) {
    return (
      <Button
        onClick={onClick}
        colorScheme={filter === currentFilter ? 'orange' : 'gray'}
      >
        {children}
      </Button>
    );
  }