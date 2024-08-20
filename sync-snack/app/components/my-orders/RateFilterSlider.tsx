'use client'

import { Box, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack } from "@chakra-ui/react"

export default function RateFilterSlider({ setRateFilter }: any) {
  return (
    <Box className='w-80'>
      <Slider defaultValue={0} min={0} max={5} step={1} onChangeEnd={(val) => setRateFilter(val)}>
        <SliderMark value={0} {...styleForAll}>
          All
        </SliderMark>
        <SliderMark value={1} {...labelStyles}>
          1
        </SliderMark>
        <SliderMark value={2} {...labelStyles}>
          2
        </SliderMark>
        <SliderMark value={3} {...labelStyles}>
          3
        </SliderMark>
        <SliderMark value={4} {...labelStyles}>
          4
        </SliderMark>
        <SliderMark value={5} {...labelStyles}>
          5
        </SliderMark>
        <SliderTrack bg='red.100'>
          <SliderFilledTrack bg='tomato' />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </Box>
  )
}

const labelStyles = {
  mt: '3',
  ml: '-1',
  fontSize: 'sm',
}

const styleForAll = {
  mt: '3',
  ml: '-2.5',
  fontSize: 'sm',
}

