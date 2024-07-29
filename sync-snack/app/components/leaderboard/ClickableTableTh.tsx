'use client'
import { Th } from "@chakra-ui/react";

export default function ClickableTableTh({ value, sortStrategy, isSorted }:
    { value: string, sortStrategy: any, isSorted: boolean }) {
    return (
        <Th className="hover:cursor-pointer" onClick={() => sortStrategy(value)}>
            {value}{isSorted ? '🔼' : ''}
        </Th>
    )
}
