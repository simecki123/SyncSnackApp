'use client'
import { Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Box className=" bg-black h-screen w-screen flex items-center justify-center text-white">
      {/*
      <DotLottieReact
        src="/loading.json"
        loop
        autoplay
        className="w-72 h-72 m-44"
      />
      */}
      <p>Loading</p>
    </Box>
  )
}
