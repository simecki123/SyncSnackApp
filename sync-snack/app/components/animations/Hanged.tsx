'use client'
import { Box, Image } from "@chakra-ui/react";
import dynamic from 'next/dynamic';

const DotLottieReact = dynamic(
  () => import('@lottiefiles/dotlottie-react').then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function Hanged() {
  return (
    <DotLottieReact
      src="/hanged2.json"
      loop
      autoplay
    />
  )
}


