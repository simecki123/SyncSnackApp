'use client'
import { Th, Flex, Text, Icon } from "@chakra-ui/react";
import { TriangleUpIcon } from "@chakra-ui/icons";

export default function ClickableTableTh({ value, sortStrategy, isSorted }: { value: string, sortStrategy: (value: string) => void, isSorted: boolean }) {
    return (
        <Th className="hover:cursor-pointer" onClick={() => sortStrategy(value)}>
            <Flex alignItems="center">
                <Text>{value}</Text>
                {isSorted && <Icon as={TriangleUpIcon} ml={1} />}
            </Flex>
        </Th>
    )
}
