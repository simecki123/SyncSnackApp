'use client'
import { Box } from "@chakra-ui/react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Loading() {
  return (
    <Box className="h-screen w-screen flex items-center justify-center text-white">
      <DotLottieReact
        src="/loading.json"
        loop
        autoplay
        className="w-72 h-72 m-44"
      />
    </Box>
  )
}
