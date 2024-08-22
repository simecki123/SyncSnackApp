'use client'
import { Box } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function Loading() {
  return (
    <Box className="h-screen w-full flex items-center justify-center text-white">
      <DotLottieReact
        src="/loading.json"
        loop
        autoplay
        className="w-72 h-72 m-44"
      />
    </Box>
  )
}

