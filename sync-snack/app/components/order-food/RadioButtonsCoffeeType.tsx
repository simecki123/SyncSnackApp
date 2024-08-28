import { Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"

export default function RadioButtonsCoffeeType({ value, setValue }: any) {
  return (
    <RadioGroup onChange={setValue} value={value} defaultValue="latte">
      <Stack direction='row' spacing={20}>
        <Radio value='latte' colorScheme="xorange">Latte</Radio>
        <Radio value='macchiato' colorScheme="xorange">Macchiato</Radio>
        <Radio value='turkish' colorScheme="xorange">Turkish</Radio>
      </Stack>
    </RadioGroup>
  )
}
